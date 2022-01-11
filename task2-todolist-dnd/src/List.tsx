import './App.css';
import React, { useEffect, ReactDOM, useState, SetStateAction } from 'react';
import styled, { StyledComponent } from "@emotion/styled";
import { DropResult, DragDropContext, Droppable, Draggable, ResponderProvided, resetServerContext, DroppableProvided, DraggableProvided, DraggableLocation } from "react-beautiful-dnd";

enum eTaskStage {//етап виконання: Створено, Заплановано, Завершено
    tsCreated = 'tsCreated',
    tsPlaned = 'tsPlaned',
    tsFinished = 'tsFinished'
}

interface iTaskType {
    key: string;
    id: number | null;
    taskName: string;
    taskType: string;
    taskStage: eTaskStage | null;//етап виконання: Створено, Заплановано, Завершено
}

interface iInputData {
    value: string;
    onChange: any;
    onSetValue: React.Dispatch<SetStateAction<string>>;
};

const STORAGE_KEY_TODOLIST: string = 'TodoList';
const STORAGE_KEY_FORM: string = 'TodoForm';
const EMPTY_FORM: iTaskType = { key: '', id: null, taskName: '', taskType: '', taskStage: null };
const generateId = () => new Date().getTime();
//const todolist: iTaskType[] = [];


//====================================================================================================================
function List() {
    const [formValues, setFormValues] = useState<iTaskType>(EMPTY_FORM)
    const [tableValues, setTableValues] = useState<iTaskType[]>([]);

    const handleAddTodo: React.MouseEventHandler = (e: React.MouseEvent) => {
        //console.log('eventClick');
        if (!!formValues.id) {
            tableValues.push(formValues);
            setTableValues(tableValues);
            setFormValues(EMPTY_FORM);

        }
    }

    const handleFormChange = (field: string, value: string | number | null) => {
        setFormValues({ ...formValues, [field]: value, id: generateId(), taskType: 'label', taskStage: eTaskStage.tsCreated })
        //console.log('fv=' + formValues.id+', eventChange=' + value);
    }

    useEffect(() => {
        const formString: string | null = localStorage.getItem(STORAGE_KEY_FORM);
        const newForm: iTaskType = formString ? JSON.parse(formString) : EMPTY_FORM;
        setFormValues(newForm);

        const tableString: string | null = localStorage.getItem(STORAGE_KEY_TODOLIST);
        const newTable: iTaskType[] = tableString ? JSON.parse(tableString) : [];
        setTableValues(newTable);
        //console.log('READ ' + STORAGE_KEY_USERS + ' STORAGE =' + newUsers?.length);
    }, []);



    useEffect(() => { saveForm(formValues); }, [formValues]);
    useEffect(() => { saveTable(tableValues); }, [tableValues]);
    function saveForm(formData: iTaskType) { localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData)); };
    function saveTable(tableData: iTaskType[]) { localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(tableData)); };

    /*
      useEffect(() => {
        syncData(users);
      }, [users]);
     
      const syncData = (users: IUser[]) => {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
      console.log('SAVE to ' + STORAGE_KEY_USERS + ' STORAGE = ' + users?.length);
    }
      */


    //=========================================================================================================================
    const Table = (p: any): JSX.Element => { //{ numStage: number }
        //const len = tableValues.length - 1;
        //console.log('numStage=' + p.numStage + ', cnt=' + len + ', name=' + todolist[len]?.taskName + ', type=' + todolist[len]?.taskType + ', stage=' + todolist[len]?.taskStage);
        let tableStage: eTaskStage | null = null;
        if (p.numStage === 1) { tableStage = eTaskStage.tsCreated } else
            if (p.numStage === 2) { tableStage = eTaskStage.tsPlaned } else
                if (p.numStage === 3) { tableStage = eTaskStage.tsFinished }



        const newlist: iTaskType[] = [];
        tableValues.filter((value) => {
            //console.log('arr=' + array.length + ' ts1=' + value.taskStage + ', ts2=' + tableStage);
            if (value.taskStage === tableStage) { newlist.push(value); }
        });

        //console.log('new=' + newlist.length);

        return (
            <div>
                {newlist.map(item =>
                    <h1>{item.taskName} </h1>
                )
                }
            </div>
        )
    }
    //=====================================================================================================================================

    return (
        <div className="parent">
            <div className="div1"> <label>{"Назва задачі"}</label> <input value={formValues.taskName} onChange={e => handleFormChange('taskName', e.target.value)} ></input>
                <button disabled={!formValues.taskName} onClick={handleAddTodo}>{"Створити задачу"}</button>
            </div>
            <div className="div2"> <Table numStage={1} />
            </div>
            <div className="div3"> <Table numStage={2} />
            </div>
            <div className="div4"> <Table numStage={3} />
            </div>
        </div >
    );

}
export default List;