import React, { Component } from 'react';
import CrudTableTitle from '../common/CrudTableTitle/CrudTableTitle';
import CrudTableHeader from '../common/CrudTableHeader/CrudTableHeader';
import Asset from './asset/Asset';

class Assets extends Component {
    state = { assets: []  };

    componentDidMount(){
        fetch('http://localhost:8080/assets?page=0&size=10')
        .then(res => res.json())
        .then((data) => {
          this.setState({ assets: data.content })
          console.log(this.state.assets);
        })
        .catch(console.log)
    }

    render() { 
        if(!this.state.assets)
            return null;
        return ( 
            <section>
                <CrudTableTitle title="Assets" />
                <table className="table table-striped table-hover">
                <CrudTableHeader headers={["ID", "Code", "Price"]}/>
                <tbody>
                    {this.state.assets.map((asset, i) =>{
                        return (
                            <Asset key={i} id={asset.id} code={asset.code} />
                        );
                    } )}
                </tbody>
                </table>
            </section>
         );
    }
}
 
export default Assets;

/* <div class="table-responsive">
    <div class="table-wrapper">
        <div class="table-title">
            <div class="row">
                <div class="col-sm-6">
                    <h2>Manage <b>Employees</b></h2>
                </div>
                <div class="col-sm-6">
                    <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons"></i> <span>Add New Employee</span></a>
                    <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons"></i> <span>Delete</span></a>						
                </div>
            </div>
        </div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="selectAll">
                            <label for="selectAll"></label>
                        </span>
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox1" name="options[]" value="1">
                            <label for="checkbox1"></label>
                        </span>
                    </td>
                    <td>Thomas Hardy</td>
                    <td>thomashardy@mail.com</td>
                    <td>89 Chiaroscuro Rd, Portland, USA</td>
                    <td>(171) 555-2222</td>
                    <td>
                        <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox2" name="options[]" value="1">
                            <label for="checkbox2"></label>
                        </span>
                    </td>
                    <td>Dominique Perrier</td>
                    <td>dominiqueperrier@mail.com</td>
                    <td>Obere Str. 57, Berlin, Germany</td>
                    <td>(313) 555-5735</td>
                    <td>
                        <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox3" name="options[]" value="1">
                            <label for="checkbox3"></label>
                        </span>
                    </td>
                    <td>Maria Anders</td>
                    <td>mariaanders@mail.com</td>
                    <td>25, rue Lauriston, Paris, France</td>
                    <td>(503) 555-9931</td>
                    <td>
                        <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="custom-checkbox">
                            <input type="checkbox" id="checkbox4" name="options[]" value="1">
                            <label for="checkbox4"></label>
                        </span>
                    </td>
                    <td>Fran Wilson</td>
                    <td>franwilson@mail.com</td>
                    <td>C/ Araquil, 67, Madrid, Spain</td>
                    <td>(204) 619-5731</td>
                    <td>
                        <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a>
                        <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="clearfix">
            <div class="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
            <ul class="pagination">
                <li class="page-item disabled"><a href="#">Previous</a></li>
                <li class="page-item"><a href="#" class="page-link">1</a></li>
                <li class="page-item"><a href="#" class="page-link">2</a></li>
                <li class="page-item active"><a href="#" class="page-link">3</a></li>
                <li class="page-item"><a href="#" class="page-link">4</a></li>
                <li class="page-item"><a href="#" class="page-link">5</a></li>
                <li class="page-item"><a href="#" class="page-link">Next</a></li>
            </ul>
        </div>
    </div>
</div> */