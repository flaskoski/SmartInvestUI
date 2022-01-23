import React, { Component } from 'react';
import CrudTableTitle from './CrudTableTitle/CrudTableTitle';
import CrudTableHeader from './CrudTableHeader/CrudTableHeader';
import CrudAddModal from './CrudAddModal/CrudAddModal';
import CrudDeleteItemModal from './CrudDeleteItemModal/CrudDeleteItemModal';
import CrudTableRow from './CrudTableRow/CrudTableRow';
import "./CrudTable.css"
import CrudEditItemModal from './CrudEditItemModal/CrudEditItemModal';
import { v4 } from 'uuid';

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
            openModal: false,
            updatedHash: 0
        }
        this.addItemButtonClicked = this.addItemButtonClicked.bind(this);
        this.deleteItemButtonClicked = this.deleteItemButtonClicked.bind(this);
        this.editItemButtonClicked = this.editItemButtonClicked.bind(this);
        this.handleUpdateItem = this.handleUpdateItem.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.onFilterChangedHandler = this.onFilterChangedHandler.bind(this);
    }

    componentDidMount(){
        this.getItems()
    }

    render() {
        return ( 
            <section className="crudTable">
                <CrudTableTitle title={this.props.itemType} onAddClickedHandler={this.addItemButtonClicked}/>
                    <div id="table-scroll">
                        <table className="custom-table table-striped table-hover fill">
                        <CrudTableHeader key={`${this.props.itemType}-headers-${
                          this.props.fields.filter(f=> f.choices && ((f.choices.length && f.choices.length>0) || Object.keys(f.choices).length > 0) ).length}`} 
                            headers={this.props.fields.filter(f=> !f.hide)}
                            onFilterChanged={this.onFilterChangedHandler}/>
                         {/* ["ID",  "Code", "Price"] */}
                        <tbody>
                            {this.state.items.map((item, i) =>{
                                if(i >= this.props.maxRows) return ("")
                                return (
                                    <CrudTableRow key={`${item.id}-${this.state.updatedHash}`} item={item} fields={this.props.fields}
                                    itemUpdateHandler={this.props.itemUpdateHandler} 
                                    onItemDeleteClickedHandler={this.deleteItemButtonClicked}
                                    onItemEditClickedHandler={this.editItemButtonClicked}
                                    />
                                );
                            } )}
                        </tbody>
                        </table>
                        <p style={{paddingLeft:"20px" }}>{this.state.total? `Items found: ${this.state.total}`: ""}</p>
                    </div>
                <CrudAddModal key={"addItemModal-"+this.state.openModal} open={this.state.openModal} 
                    itemType={this.props.itemType} 
                    itemFields={this.props.fields} 
                    backendUrl={this.props.backendUrl}
                    backendHeaders={this.props.backendHeaders}
                    handleAddToTable={this.handleAdd}
                    />
                <CrudDeleteItemModal key={"deleteItemModal-"+this.state.openDeleteItemModal} open={this.state.openDeleteItemModal}      
                    itemType={this.props.itemType} 
                    fields={this.props.fields}
                    item={this.state.itemClicked} 
                    backendUrl={this.props.backendUrl}
                    backendHeaders={this.props.backendHeaders}
                    handleDeleteItem={this.handleDeleteItem}
                    />
                <CrudEditItemModal key={"editItemModal-"+this.state.openEditItemModal} open={this.state.openEditItemModal} itemType={this.props.itemType} 
                    itemFields={this.props.fields}  
                    item={this.state.itemClicked} 
                    backendUrl={this.props.backendUrl}
                    backendHeaders={this.props.backendHeaders}
                    handleAction={this.handleUpdateItem}
                    />
            </section>
         );
    }

    getItems(removedOptions = {}){
        this.props.getItems(removedOptions).then(result => {
            if(result){
                if(result?.items)//for java pageable backend
                    this.setState({items: result.items, total: result.items.length})
                // else if(result.length)
                //     this.setState({items: result, total: undefined})
            }
        }).catch(`Error loading ${this.props.itemType}`)
    }

    //--filter header used
    onFilterChangedHandler(removedOptions){
        if(removedOptions)
          console.log("removed options:", removedOptions)
        this.getItems(removedOptions)
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
    editItemButtonClicked(item){
        this.setState({
            openEditItemModal: true,
            itemClicked: item
        })
    }

    //---Dialogs events handlers
    handleAdd(isAdded, newItem){
        if(isAdded){
            let allItems = this.state.items
            allItems.push(typeof this.props.formatItem === 'function' ? this.props.formatItem(newItem): newItem)
            this.setState({
                items: allItems,
                openModal: false
            })
        }else
            this.setState({openModal: false})
    }

    handleUpdateItem(isUpdated, updatedItem){//TODO the ddb doesnt return the whole item
        if(isUpdated){
            let allItems = this.state.items
            allItems.splice(allItems.indexOf(allItems.find(i =>i.id == updatedItem.id)), 1)
            allItems.push(typeof this.props.formatItem === 'function' ? this.props.formatItem(updatedItem): updatedItem)
            this.setState({
                items: allItems,
                openEditItemModal: false,
                //set a new uuid to change the item row's key and update 
                updatedHash: v4()
            })
        }else
            this.setState({openEditItemModal: false})
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
 
export const getLookupKey = field => field? Object.keys(field)[0] : ''
export const getLookupValue = field => field? Object.values(field)[0] : ''
export const formatLookupFields = (item, fields) => 
  Object.entries(item).reduce((ac, [key, val]) => 
    fields?.find(f => f.name === key)?.type === 'lookup'
    ? {...ac, [key]: getLookupValue(val)}
    : {...ac, [key]: val}, {}
  )


export default CrudTable;