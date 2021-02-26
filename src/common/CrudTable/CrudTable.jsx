import React, { Component } from 'react';
import CrudTableTitle from './CrudTableTitle/CrudTableTitle';
import CrudTableHeader from './CrudTableHeader/CrudTableHeader';
import CrudAddModal from './CrudAddModal/CrudAddModal';
import CrudTableRow from './CrudTableRow/CrudTableRow';


/**
 * @param itemType*: word for describing the item on the table and dialogs
 * @param fields*: array with info about the fields. Each field has the following attributes:
 *     {name: (String) Name of the field on the data
        label: (String) String to appear as title of the field
        type: (String) types: "text" | "int" | "float" | "date"
        isInput: (Boolean) true | false - indicates if the field should appear on new and edit dialogs }
    @param items*: data array
    @param itemUpdateHandler: callback to customize changes on the data
 */


class CrudTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields : props.fields,
            children: props.children,
            openModal: false
        }
        console.log("table construct - this.props.items")
        console.log(this.props.items)
        this.addItemButtonClicked = this.addItemButtonClicked.bind(this);
    }
    
    // componentWillReceiveProps(newProps) {
    //     console.log("newprops received", this.state.openModal)
    //     this.setState({
    //         fields : newProps.fields,
    //         items : newProps.items
    //     })
    // }

    render() {
        return ( 
            <section>
                <CrudTableTitle title={this.props.itemType} onAddClickedHandler={this.addItemButtonClicked}/>
                    <div id="table-scroll">
                        <table className="custom-table table-striped table-hover fill">
                        <CrudTableHeader headers={this.props.fields.map(f => f.label)} tableData={this.props.items}/>
                         {/* ["ID",  "Code", "Price"] */}
                        <tbody>
                            {this.props.items.map((item, i) =>{
                                return (
                                    <CrudTableRow itemKey={i} item={item} fields={this.props.fields}
                                    itemUpdateHandler={this.props.itemUpdateHandler} />
                                );
                            } )}
                        </tbody>
                        </table>
                    </div>
                <CrudAddModal open={this.state.openModal} itemType={this.props.itemType} itemFields={this.props.fields} />
            </section>
         );
    }
    
    addItemButtonClicked(){
        this.setState({
            openModal: true
        })
    }
}
 
export default CrudTable;