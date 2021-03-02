import React, { Component } from 'react';
import CrudTableTitle from './CrudTableTitle/CrudTableTitle';
import CrudTableHeader from './CrudTableHeader/CrudTableHeader';
import CrudAddModal from './CrudAddModal/CrudAddModal';
import CrudDeleteItemModal from './CrudDeleteItemModal/CrudDeleteItemModal';
import CrudTableRow from './CrudTableRow/CrudTableRow';
import "./CrudTable.css"


/**
 * @param itemType*: word for describing the item on the table and dialogs
 * @param fields*: array with info about the fields. Each field has the following attributes:
 *     {name: (String) Name of the field on the data received and to send (POST/PUT)
        label: (String) String to appear as title of the field
        type: (String) types: "text" | "int" | "float" | "date"
        isInput: (Boolean) true | false - indicates if the field should appear on new and edit dialogs 
        isRequired: true | false }
    @param items*: data array
    @param itemUpdateHandler: callback to customize changes on the data
 */


class CrudTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            openModal: false
        }
        console.log("table construct - this.props.items")
        console.log(this.props.items)
        this.addItemButtonClicked = this.addItemButtonClicked.bind(this);
        this.deleteItemButtonClicked = this.deleteItemButtonClicked.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
    }

    componentDidMount(){
        this.props.getItems().then(items => {
            if(items)
                this.setState({items: items})
        }).catch(`Error loading ${this.props.itemType}`)
    }

    render() {
        return ( 
            <section className="crudTable">
                <CrudTableTitle title={this.props.itemType} onAddClickedHandler={this.addItemButtonClicked}/>
                    <div id="table-scroll">
                        <table className="custom-table table-striped table-hover fill">
                        <CrudTableHeader headers={this.props.fields.map(f => f.label)} tableData={this.state.items}/>
                         {/* ["ID",  "Code", "Price"] */}
                        <tbody>
                            {this.state.items.map((item, i) =>{
                                return (
                                    <CrudTableRow key={item.id} item={item} fields={this.props.fields}
                                    itemUpdateHandler={this.props.itemUpdateHandler} 
                                    onItemDeleteClickedHandler={this.deleteItemButtonClicked}
                                    />
                                );
                            } )}

                        </tbody>
                        </table>
                    </div>
                <CrudAddModal open={this.state.openModal} itemType={this.props.itemType} 
                    itemFields={this.props.fields} 
                    backendUrl={this.props.backendUrl}
                    handleAddToTable={this.handleAdd}
                    />
                <CrudDeleteItemModal key={"deleteItemModal-"+this.state.openDeleteItemModal} open={this.state.openDeleteItemModal} itemType={this.props.itemType} 
                    item={this.state.itemClicked} 
                    backendUrl={this.props.backendUrl}
                    handleDeleteItem={this.handleDeleteItem}
                    />
            </section>
         );
    }
    
    //--Buttons clicked handlers
    addItemButtonClicked(){
        this.setState({
            openModal: true
        })
    }
    deleteItemButtonClicked(item){
        this.setState({
            openDeleteItemModal: true,
            itemClicked: item
        })
    }

    //---Dialogs events handlers
    handleAdd(isAdded, newItem){
        if(isAdded){
            let allItems = this.state.items
            allItems.push(newItem)
            this.setState({
                items: allItems,
                openModal: false
            })
        }else
            this.setState({openModal: false})
    }

    handleUpdate(){

    }

    handleDeleteItem(isDeleted, deletedItem){
        if(isDeleted){
            let allItems = this.state.items
            allItems.splice(allItems.indexOf(deletedItem), 1)
            this.setState({
                items: allItems,
                openDeleteItemModal: false
            })
        }else
            this.setState({openDeleteItemModal: false})
    }
}
 
export default CrudTable;