import React, { Component } from 'react';
import CrudTableTitle from '../CrudTableTitle/CrudTableTitle';
import CrudTableHeader from '../CrudTableHeader/CrudTableHeader';
import CrudAddModal from '../CrudAddModal/CrudAddModal';
import CrudTableRow from '../CrudTableRow/CrudTableRow';

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
                <CrudTableTitle title="Assets" onAddClickedHandler={this.addItemButtonClicked}/>
                    <div id="table-scroll">
                        <table className="custom-table table-striped table-hover fill">
                        <CrudTableHeader headers={this.props.fields.map(f => f.label)} tableData={this.props.items}/>
                         {/* ["ID",  "Code", "Price"] */}
                        <tbody>
                            {this.props.items.map((item, i) =>{
                                return (
                                    <CrudTableRow itemKey={i} item={item} fieldsLength={this.props.fields.length}
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