import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { todoSlice } from './store/createSlice';
import { todoSliceDask } from './store/CreateSliseDask';
import './style/style.scss'
import ListItem from './components/ListItem';
import BtnAddList from './components/Buttons';
import { useState } from 'react';
import { FlexContainer } from './styledComponents/FlexContainer';
import FormForList from './components/Forms/FormForList';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { $CombinedState } from '@reduxjs/toolkit';
import FormForTasks from './components/Forms/FormForTasks';
import TasksItem from './components/Tasks/TasksItem';
import NavBlock from './components/Navblock/Navblock';
import Header from './components/Header/Header';
import ModalDelete from './components/ModalDelete/ModalDelete';
import {Routes, Route} from 'react-router-dom'
import CalendarWindow from './components/Calendar/CalendarWindow/CalendarWindow';

function App() {
  const {todos} = useAppSelector(state=>state.todos)
  const {dasks} = useAppSelector(state=>state.dasks)
  const { addTodo,  } = todoSlice.actions
  const {  addDask,   } = todoSliceDask.actions
  const dispatch = useAppDispatch()
  const  [stateFormDask, setStateFormDask]:any = useState(false)
  const  [stateFormTask, setStateFormTask]:any = useState(false)
  const  [stateModalDelete, setStateModalDelete]:any = useState(false)
  const navList = [
    {
    id: 1,
    name: 'ToDo board',
    link: '/'
  }, {
    id: 2,
    name: 'Calendar',
    link: 'calendar'
    
  }]

const addNewList = (ListName:any)=>{
  const NewList = {
    title: ListName,
    id: new Date().getTime(),
    item: [],
    order:  dasks.length +1
  }
  setStateFormDask(false)
  dispatch(addDask(NewList))
}

const addNewTask = (taskItem:any) =>{
  dispatch(addTodo(taskItem))
  setStateFormTask(false)
  // dispatch(addItemInDask(taskItem))
}
// const changeOrderDispach=(item:any)=>{
//   dispatch(changeOrderDragDrop(item))
// }

  return (
    <div className="App">

       <Header/>
          <FlexContainer className='Wrapper' align = {'flex-start'} justify = {'flex-start'} >
              <FormForList stateForm={stateFormDask} addForm = {addNewList} closeForm={()=>setStateFormDask(false)}/>
              <FormForTasks stateFormTask={stateFormTask} addDispatch={addNewTask} closeForm={()=>setStateFormTask(false)}/>
            <NavBlock list={navList}/>
              {/* <FlexContainer padding = {'40px 0'} direction = {'row'}  gap = {'10px'}> */}
                <Routes>
                  <Route path='/' element={
                  <ListItem addList={()=>{setStateFormDask(true)}}  list={dasks} addTask={()=>setStateFormTask(true)} >
                  <TasksItem />
                </ListItem>}/>
                <Route path='calendar' element={<CalendarWindow/>}/>
                </Routes>
          </FlexContainer>
          
    
    </div>
  );
}

export default App;
