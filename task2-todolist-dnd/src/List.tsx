import './App.css';
import React, { useEffect, ReactDOM, useState, SetStateAction } from 'react';
import styled, { StyledComponent } from "@emotion/styled";
import { DraggingStyle, NotDraggingStyle, DropResult, DragDropContext, Droppable, Draggable, ResponderProvided, resetServerContext, DroppableProvided, DraggableProvided, DraggableLocation } from "react-beautiful-dnd";

enum eTaskStage {//етап виконання: Створено, Заплановано, Завершено
    tsCreated = 'tsCreated',
    tsPlaned = 'tsPlaned',
    tsFinished = 'tsFinished'
}

interface iTaskType {
    key: string;
    id: string;
    taskName: string;
    taskType: string;
    taskStage: eTaskStage | null;//етап виконання: Створено, Заплановано, Завершено
}

interface iInputData {
    value: string;
    onChange: any;
    onSetValue: React.Dispatch<SetStateAction<string>>;
};
const grid: number = 8;
const QuoteItem: StyledComponent<any, any, any> = styled.div`
  width: 200px;
  height: 50px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
  background-color:  lightblue;
  `;


const STORAGE_KEY_TODOLIST: string = 'TodoList';
const STORAGE_KEY_FORM: string = 'TodoForm';
const EMPTY_FORM: iTaskType = { key: '', id: '', taskName: '', taskType: '', taskStage: null };
const generateId = () => new Date().getTime().toString();
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


    const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    function onDragEnd(r: DropResult): void {
        if (!r.destination) {
            return;
        }

    }

    //=========================================================================================================================
    function Table(p: any): JSX.Element { //{ numStage: number }
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
        //=========================================================================================================

        return (
            <>
                <Droppable droppableId={"droppable" + p.numStage} mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} >
                            {provided.placeholder}
                            {newlist.map((item: iTaskType, index: number) => (
                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                    {(provided, snapshot) => (
                                        <QuoteItem className="card"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {item.taskName}
                                        </QuoteItem>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </>
        );
    };
    //=====================================================================================================================================

    return (
        <div >

            <div > <label>{"Назва задачі"}</label> <input value={formValues.taskName} onChange={e => handleFormChange('taskName', e.target.value)} ></input>
                <button disabled={!formValues.taskName} onClick={handleAddTodo}>{"Створити задачу"}</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}   >
                <Table numStage={1} />

                <Table numStage={2} />

                <Table numStage={3} />
            </DragDropContext>

        </div >
    );

}
export default List;