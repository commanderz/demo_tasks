import './List.css';
import React, { useEffect, useState } from 'react';
//import styled from '@emotion/styled/types/base';
import styled, { StyledComponent } from '@emotion/styled';
import { DraggingStyle, NotDraggingStyle, DropResult, DragDropContext, Droppable, Draggable, ResponderProvided, DraggableLocation, DragStart } from "react-beautiful-dnd"; //resetServerContext, DroppableProvided, DraggableProvided



enum eTaskStage {//етап виконання: Створено, Заплановано, Завершено
    tsCreated = 'Список всіх справ',
    tsPlaned = 'Заплановані справи',
    tsFinished = 'Завершені справи'
}
interface iTaskType {
    key: string;
    id: string;
    taskName: string;
    taskType: string;
}

interface iTasks {
    created: iTaskType[];
    planed: iTaskType[];
    finished: iTaskType[];
}

const grid: number = 8;
const QuoteItem: StyledComponent<any, any, any> = styled.div`
  width: auto;
  height: auto;
  margin-bottom: ${grid}px;
  padding: ${grid}px;
  background-color: lightblue;
  `;

const STORAGE_KEY_TODOLIST: string = 'TodoList';
const STORAGE_KEY_FORM: string = 'TodoForm';

//получається що немає смисла використовувати ось такі штуки:
//const EMPTY_FORM: iTaskType = { key: '', id: '', taskName: '', taskType: '' };
//const EMPTY_TABLE: iTasks = { created: [], planed: [], finished: [] };
const generateId = () => new Date().getTime().toString();

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : null,
    boxShadow: isDragging ? "0 4px 8px 0 #444, 0 6px 20px 0 #444" : null,
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean, isDel: boolean = false) => ({
    background: isDraggingOver ? (isDel ? '#EC6D5C' : '#10AA02') : "#686868",
    padding: grid,
    borderRadius: 8,
    transition: "background-color 1.0s ease 0s"
});
//====================================================================================================================
function List() {
    const [formValues, setFormValues] = useState<iTaskType>({ key: '', id: '', taskName: '', taskType: '' });//замість EMPTY_FORM
    const [tableValues, setTableValues] = useState<iTasks>({ created: [], planed: [], finished: [] });//замість EMPTY_TABLE

    const handleAddTodo: React.MouseEventHandler = (e: React.MouseEvent) => {
        if (!!formValues.id) {
            tableValues.created.push(formValues);
            setTableValues({ created: tableValues.created, planed: tableValues.planed, finished: tableValues.finished });
            setFormValues({ key: '', id: '', taskName: '', taskType: '' });//замість EMPTY_FORM
        }
    }

    const handleFormChange = (field: string, value: string | number | null) => {
        setFormValues({ ...formValues, [field]: value, id: generateId(), taskType: 'label' })
    }

    useEffect(() => {
        const formString: string | null = localStorage.getItem(STORAGE_KEY_FORM);
        const newForm: iTaskType = formString ? JSON.parse(formString) : { key: '', id: '', taskName: '', taskType: '' };
        setFormValues(newForm);

        const tableString: string | null = localStorage.getItem(STORAGE_KEY_TODOLIST);
        const newTable: iTasks = tableString ? JSON.parse(tableString) : { created: [], planed: [], finished: [] };
        setTableValues({ created: newTable.created, planed: newTable.planed, finished: newTable.finished });
    }, []);

    useEffect(() => { saveForm(formValues); }, [formValues]);
    useEffect(() => { saveTable(tableValues); }, [tableValues]);
    function saveForm(formData: iTaskType) { localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData)); };
    function saveTable(tableData: iTasks) { localStorage.setItem(STORAGE_KEY_TODOLIST, JSON.stringify(tableData)); };




    function reorder(list: iTaskType[], startIndex: number, endIndex: number): iTaskType[] {
        const result: iTaskType[] = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    function move(source: iTaskType[], destination: iTaskType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation): iTasks {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result: iTasks = { created: [], planed: [], finished: [] };//замісь EMPTY_TABLE;
        result.created = Array.from(tableValues.created);
        result.planed = Array.from(tableValues.planed);
        result.finished = Array.from(tableValues.finished);

        if (droppableSource.droppableId === 'droppable1') { result.created = sourceClone; }
        else if (droppableSource.droppableId === 'droppable2') { result.planed = sourceClone; }
        else if (droppableSource.droppableId === 'droppable3') { result.finished = sourceClone; }

        if (droppableDestination.droppableId === 'droppable1') { result.created = destClone; }
        else if (droppableDestination.droppableId === 'droppable2') { result.planed = destClone; }
        else if (droppableDestination.droppableId === 'droppable3') { result.finished = destClone; }
        return result;
    };



    function getList(id: string): iTaskType[] {
        if (id === 'droppable1') { return tableValues.created }
        else if (id === 'droppable2') { return tableValues.planed }
        else if (id === 'droppable3') { return tableValues.finished }
        else return [];
    };
    function setList(id: string, arr: iTaskType[]) {
        if (id === 'droppable1') { setTableValues({ ...tableValues, created: arr }); }
        else if (id === 'droppable2') { setTableValues({ ...tableValues, planed: arr }); }
        else if (id === 'droppable3') { setTableValues({ ...tableValues, finished: arr }); }
    }

    function onDragEnd_Delete(r: DropResult, p: ResponderProvided) {
        if (!r.destination) { return; }
        console.log('delete = ' + r.source.droppableId);
    }

    function onDragEnd(r: DropResult): void {
        if (!r.destination) { return; }
        if ((r.destination.index === r.source.index) && (r.destination.droppableId === r.source.droppableId)) { return; }
        if (r.destination.droppableId === r.source.droppableId) {
            const quote = reorder(
                getList(r.source.droppableId),
                r.source.index,
                r.destination.index
            );
            setList(r.source.droppableId, quote);
        } else {
            const result: iTasks = move(
                getList(r.source.droppableId),
                getList(r.destination.droppableId),
                r.source,
                r.destination
            );
            setTableValues({ created: result.created, planed: result.planed, finished: result.finished });
        }
    }



    //=====================================================================================================================================

    return (
        <div className="wrapper" >
            <DragDropContext onDragEnd={onDragEnd}   >
                <div className="header">
                    <div> <h4 className="styleh4">{"Нова задача"}</h4>
                        <QuoteItem className="divitem tc">
                            <input className="styleinput" value={formValues.taskName} onChange={e => handleFormChange('taskName', e.target.value)} ></input>
                            <button className="btn" disabled={!formValues.taskName} onClick={handleAddTodo}>{"Створити задачу"}</button>
                        </QuoteItem>


                        <Droppable droppableId={"droppableDel"} mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical" >
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}{...provided.droppableProps}
                                    style={getListStyle(snapshot.isDraggingOver, true)}
                                >
                                    <div className="divitem grayed tc">{'<Перетягніть сюди щоб видалити>'}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>



                    </div>

                </div>


                <Table num={1} classNamez='content1' title={eTaskStage.tsCreated} list={tableValues.created} />
                <Table num={2} classNamez='content2' title={eTaskStage.tsPlaned} list={tableValues.planed} />
                <Table num={3} classNamez='content3' title={eTaskStage.tsFinished} list={tableValues.finished} />
            </DragDropContext >

        </div >
    );

}

//=========================================================================================================================
function Table(p: { num: number, classNamez: string, title: eTaskStage | null, list: iTaskType[] }): JSX.Element {
    return (
        <div className={p.classNamez}>
            <h4 className="styleh4" > {p.title?.toString()}</h4>
            <Droppable droppableId={"droppable" + p.num} mode="standard" isDropDisabled={false} isCombineEnabled={false} direction="vertical" >
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}{...provided.droppableProps}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {p.list?.length > 0 ?
                            p.list.map((item: iTaskType, index: number) => (
                                <Draggable draggableId={item.id} index={index} key={item.id} disableInteractiveElementBlocking={true}>
                                    {(provided, snapshot) => (
                                        <QuoteItem className="divitem tl"
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
                            ))
                            : <div className="divitem grayed tc">{'<Порожньо>'}</div>
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        </div >
    );
};

export default List;