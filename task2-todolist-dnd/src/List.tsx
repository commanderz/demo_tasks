import './App.css';
import React, { useEffect, ReactDOM, useState, SetStateAction } from 'react';
import styled, { StyledComponent } from "@emotion/styled";
import { DraggingStyle, NotDraggingStyle, DropResult, DragDropContext, Droppable, Draggable, ResponderProvided, resetServerContext, DroppableProvided, DraggableProvided, DraggableLocation } from "react-beautiful-dnd";

enum eTaskStage {//етап виконання: Створено, Заплановано, Завершено
    tsCreated = 'Список всіх справ',
    tsPlaned = 'Заплановані справи',
    tsFinished = 'Завершені справи'
}
const id2List = {
    droppable: 'created',
    droppable2: 'planed',
    droppable3: 'finished'
};

interface iTaskType {
    key: string;
    id: string;
    taskName: string;
    taskType: string;
    taskStage: eTaskStage | null;//етап виконання: Створено, Заплановано, Завершено
}

interface iTasks {
    created: iTaskType[];
    planed: iTaskType[];
    finished: iTaskType[];
}

interface iInputData {
    value: string;
    onChange: any;
    onSetValue: React.Dispatch<SetStateAction<string>>;
};
const grid: number = 8;
const QuoteItem: StyledComponent<any, any, any> = styled.div`
  width: auto;
  height: auto;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
  background-color: lightblue;
  `;


const STORAGE_KEY_TODOLIST: string = 'TodoList';
const STORAGE_KEY_FORM: string = 'TodoForm';
const EMPTY_FORM: iTaskType = { key: '', id: '', taskName: '', taskType: '', taskStage: null };
const EMPTY_TABLE: iTasks = { created: [], finished: [], planed: [] };
const generateId = () => new Date().getTime().toString();
//const todolist: iTaskType[] = [];


//====================================================================================================================
function List() {
    const [formValues, setFormValues] = useState<iTaskType>(EMPTY_FORM)
    const [tableValues, setTableValues] = useState<iTasks>(loadTask());

    const handleAddTodo: React.MouseEventHandler = (e: React.MouseEvent) => {
        //console.log('eventClick');
        if (!!formValues.id) {
            tableValues?.created.push(formValues);
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

        /*const tableString: string | null = localStorage.getItem(STORAGE_KEY_TODOLIST);
        const newTable: iTaskType[] = tableString ? JSON.parse(tableString) : [];
        setTableValues(newTable);*/
        //console.log('READ ' + STORAGE_KEY_USERS + ' STORAGE =' + newUsers?.length);
    }, []);

    function loadTask(): iTasks {
        if (window !== undefined) {//сторона клієнта
            const tasksString: string | null = localStorage.getItem(STORAGE_KEY_TODOLIST);
            const newTasks: iTasks = tasksString ? JSON.parse(tasksString) : EMPTY_TABLE;
            return (newTasks);
        } else return EMPTY_TABLE;
    }

    useEffect(() => { saveForm(formValues); }, [formValues]);
    useEffect(() => { saveTable(tableValues); }, [tableValues, tableValues.created, tableValues.finished, tableValues.planed]);
    function saveForm(formData: iTaskType) { localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData)); console.log('saveF=' + JSON.stringify(formData)) };
    function saveTable(tableData: iTasks) { localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(tableData)); console.log('saveT=' + JSON.stringify(tableData)) };


    const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : null,

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250
    });

    function reorder2(list: iTaskType[], startIndex: number, endIndex: number): iTaskType[] {
        const result: iTaskType[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;

    };
    function move(source: iTaskType[], destination: iTaskType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result: iTasks = EMPTY_TABLE; //tableValues;
        result.created = Array.from(tableValues.created);
        result.planed = Array.from(tableValues.planed);
        result.finished = Array.from(tableValues.finished);
        if (droppableSource.droppableId === 'droppable1') {
            result.created = sourceClone;
        } else
            if (droppableSource.droppableId === 'droppable2') {
                result.planed = sourceClone;
            } else
                if (droppableSource.droppableId === 'droppable3') {
                    result.finished = sourceClone;
                }

        if (droppableDestination.droppableId === 'droppable1') {
            result.created = destClone;
        } else
            if (droppableDestination.droppableId === 'droppable2') {
                result.planed = destClone;
            } else
                if (droppableDestination.droppableId === 'droppable3') {
                    result.finished = destClone;
                }
        console.log('created=' + result.created.length + ', planed=' + result.planed.length + ', finish=' + result.finished.length);

        return result;
    };



    function getList(id: string): iTaskType[] {
        if (id === 'droppable1') { return tableValues.created }
        else
            if (id === 'droppable2') { return tableValues.planed }
            else
                if (id === 'droppable3') { return tableValues.finished }
                else return [];
        //return state[id2List[id]]; 
    };
    function saveList(id: string, arr: iTaskType[]) {
        if (id === 'droppable1') {
            setTableValues({ created: arr, planed: tableValues.planed, finished: tableValues.finished });
        } else
            if (id === 'droppable2') {
                setTableValues({ created: tableValues.created, planed: arr, finished: tableValues.finished });
            } else
                if (id === 'droppable3') {
                    setTableValues({ created: tableValues.created, planed: tableValues.planed, finished: arr });
                }
    }

    function onDragEnd(r: DropResult): void {
        if (!r.destination) {
            return;
        }
        if ((r.destination.index === r.source.index) && (r.destination.droppableId === r.source.droppableId)) {
            //console.log('do nothing');
            return;
        }
        if (r.destination.droppableId === r.source.droppableId) {
            console.log('move src = ' + r.source.droppableId + ', idx=' + r.source.index);
            console.log('move dest = ' + r.destination.droppableId + ', idx=' + r.destination.index);
            const quote = reorder2(
                //state.quotes,
                getList(r.source.droppableId),
                r.source.index,
                r.destination.index
            );
            console.log(quote);
            saveList(r.source.droppableId, quote);


        } else {
            console.log('move2 src = ' + r.source.droppableId + ', idx=' + r.source.index);
            console.log('move2 dest = ' + r.destination.droppableId + ', idx=' + r.destination.index);
            const result: iTasks = move(
                getList(r.source.droppableId),
                getList(r.destination.droppableId),
                r.source,
                r.destination
            );

            setTableValues(result);

        }
    }

    //=========================================================================================================================
    function Table(p: any): JSX.Element { //{ numStage: number }
        //const len = tableValues.length - 1;
        //console.log('numStage=' + p.numStage + ', cnt=' + len + ', name=' + todolist[len]?.taskName + ', type=' + todolist[len]?.taskType + ', stage=' + todolist[len]?.taskStage);
        let tableStage: eTaskStage | null = null;
        let newlist: iTaskType[] = [];
        if (p.numStage === 1) { tableStage = eTaskStage.tsCreated; newlist = tableValues.created; } else
            if (p.numStage === 2) { tableStage = eTaskStage.tsPlaned; newlist = tableValues.planed; } else
                if (p.numStage === 3) { tableStage = eTaskStage.tsFinished; newlist = tableValues.finished; }




        /*tableValues.filter((value) => {
            //console.log('arr=' + array.length + ' ts1=' + value.taskStage + ', ts2=' + tableStage);
            if (value.taskStage === tableStage) { newlist.push(value); }
        });*/

        //console.log('new=' + newlist.length);
        //=========================================================================================================

        return (
            <div className='divsecondary123'>
                <h3 className="styleh3">{"[" + tableStage?.toString() + "]"}</h3>
                <div className="div0">
                    <Droppable droppableId={"droppable" + p.numStage} mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical" >
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {provided.placeholder}
                                {newlist.map((item: iTaskType, index: number) => (
                                    <Draggable draggableId={item.id} index={index} key={item.id} disableInteractiveElementBlocking={true}>
                                        {(provided, snapshot) => (
                                            <QuoteItem className="divitem"
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
                </div>
            </div>
        );
    };
    //=====================================================================================================================================

    return (
        <div >

            <div > <label>{"Назва задачі"}</label> <input value={formValues.taskName} onChange={e => handleFormChange('taskName', e.target.value)} ></input>
                <button disabled={!formValues.taskName} onClick={handleAddTodo}>{"Створити задачу"}</button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}   >
                <div className="divmain1">
                    <div className="divmain2">
                        <Table numStage={1} />

                        <Table numStage={2} />

                        <Table numStage={3} />
                    </div>
                </div>
            </DragDropContext >

        </div >
    );

}
export default List;