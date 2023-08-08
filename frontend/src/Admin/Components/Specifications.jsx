import React, { useEffect} from 'react'
import Title from '../../Common/Title'
import Button from '../../Common/Button'
import { useCookies } from "react-cookie";

const Specifications = ({title, project, specifications, setSpecifications }) => {
    const [cookies] = useCookies(["token"]);

    const handleClick=()=>{
        setSpecifications([...specifications,{title:"",feature:""}])
    }

    const handleChange=(e,i)=>{
        const {name,value}=e.target
        const onchangeVal = [...specifications]
        onchangeVal[i][name]=value
        setSpecifications(onchangeVal)
    }

    const handleDelete=(i)=>{
        const deleteVal = [...specifications]
        deleteVal.splice(i,1)
        setSpecifications(deleteVal)
    }

    /**
     * get selected Specification for edit
     */
    useEffect(() => {
        const getSelectedSpecification = () => {
                fetch(`/getSpecificationsById/${project._id}`,{
                    headers: {"x-access-token": cookies.token}
                })
                .then(res => res.json())
                .then(data => {
                    if(data?.specification !== undefined) {
                        setSpecifications(data.specification.specifications)
                    }
                })
                .catch(err => console.log(err))
            }
            if(project?._id) {
                getSelectedSpecification()    
              }
               
        },[])

  return (
    <div>
        <Title title={title} cssClass="fs-5 fw-bold"/>
                <div className="border border-3 p-5 py-3 shadow-lg">
                    {specifications.length > 0 && <Button type="submit" cssClass="btn float-end btn-success mb-2" label="ADD" handlerChange={handleClick}/>}
                    
                    <table className="table m-0">
                        <tbody>
                            {specifications.length > 0 ? 
                                specifications.map((val, i) =>
                                <tr key={i}>
                                <td className='border border-1 p-4 bg-transparent'>
                                    <input type="text"  className="form-control mb-2" id="specificationName" placeholder="Feature title" 
                                    name="title"
                                    value={val.title}
                                    onChange={(e) => handleChange(e, i)}
                                    />
                                    <textarea className="form-control"  id="specificationDescription" rows="3"
                                    name="feature"
                                    value={val.feature}
                                    onChange={(e) => handleChange(e, i)}
                                    ></textarea>
                                </td>
                                <td className='align-middle text-center border border-3 bg-transparent'>
                                    <i className="fa fa-trash-o fs-3 text-danger" aria-hidden="true" onClick={() => handleDelete(i)} style={{cursor: "pointer"}}></i></td>
                            </tr>
                            )
                            :   <div className='d-flex justify-content-center align-items-center flex-column'>
                                <Button type="submit" cssClass="btn btn-success mb-2" label="ADD" handlerChange={handleClick}/>
                                <p className='text-center text-warning fs-4 m-0'>"Click on button to add specifications"</p>
                                </div>
                                }
                            
                        </tbody>
                    </table>
                   
                </div>
                {/* <p>{JSON.stringify(data)}</p> */}
    </div>
  )
}

export default Specifications