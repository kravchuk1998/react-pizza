import React, {useState, useEffect} from 'react';
import axios from 'axios';
import qs from 'qs';
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { setCategoryId, setCurrentPage, setFilter } from '../redux/slices/filterSlice';



import Categories from '../component/Categories'
import Sort  from '../component/Sort';
import PizzaBlock from '../component/PizzaBlock';


import Pagination from '../component/Pagination';

const Home = ({searchValue}) => {
  
  const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [pizzas, setPizzas] = useState([]);
  
  


    const onChangeCategory = (id) => {
      
      dispatch(setCategoryId(id))
    } 
    const onChangePage = (page) => {
        dispatch(setCurrentPage(page))
    }
    // Проверяем был ли первый рендер, если да то вшиваем параметры в  адресную строчку 
    useEffect(() => {
      if(isMounted.current){
        
        const queryString = qs.stringify({
          sortType,
          categoryId,
          currentPage
        })
        
        
        navigate(`?${queryString}`)
      }  
      isMounted.current = true;
  }, [categoryId, sortType, currentPage ]);
          
    //Если был первый рендер  проверяем URL Параметры  и сохраняем в редаксе
    useEffect(() => {
            if(window.location.search){
              const params = qs.parse(window.location.search.substring(1))
              
              
              dispatch(setFilter({...params} ))
            }
            isSearch.current = false;
    }, []);

    //
    useEffect(() => {
            window.scrollTo(0, 0)
            if(!isSearch.current){
              
              const sortBy = sortType .replace('-', '');
              const order = sortType.includes('-') ? 'asc' : 'desc';
              const category = categoryId > 0 ? `category=${categoryId}` : '';
              const search = searchValue ? `&search=${searchValue}` : '';
          
              axios
              .get(`https://63dfc1018b24964ae0f372e0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
                .then(response =>{
                  setPizzas(response.data)
                  
          })
            }
            isSearch.current =false
     }, [categoryId, sortType, currentPage, searchValue ]);
         
     
    
      
      const pizzasItems = pizzas
      .map(item => 
        <PizzaBlock key={item.id} title={item.title} price={item.price} img={item.imageUrl} sizes={item.sizes} types={item.types}/>)
    

  return (
    <div className="content">
        <div className="content__top">
            <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
            <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {
              pizzasItems
            }
            
            
        </div>
        {
          categoryId === 0 && <Pagination currentPage={currentPage}  onChangePage={onChangePage}/>
        }
            
        
       
    </div>   
  )
}

export default Home