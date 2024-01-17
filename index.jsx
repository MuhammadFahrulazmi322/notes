class Box extends React.Component{
    constructor(props){
        super(props);
        this.state = {value : this.props.defaultValue}

    }
    render(){    
        
        return(
           
            <div class="form-group">
                <label for="task">Todo input</label>
                <input
                  type="text"
                  id="todo-input"
                  class="form-control form-control-lg"
                  name="task"
                />
            </div>
              
        )
    }
}
class Container extends React.Component{
    render(){
        return(
            
            <div class="container">
                <div class="row justify-content-md-center mt-5 mb-5">
                    <div class="col col-lg-2"></div>
                    <div class="col-md-auto text-center">
                        <h1 id="project-title">Catatan Kegiatan</h1>
  
                    </div>
                
                    <div class="col col-lg-2"></div>
                </div>
                

            </div>
            
            
        )
    }
}




ReactDOM.render(<Container/>,document.getElementById("root"));

ReactDOM.render(<Box/>,document.getElementById("todo-form"));
