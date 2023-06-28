import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import {Skill} from '../../data/Entities';
import React, {useState} from "react";
import useHttp from "../../config/https";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../../components/loaders/Loader';

const AvailableSkills = () => {

    const {axiosInstance, loading} = useHttp();
    const [skills, setSkills] = useState<Skill[]>([]);
    
    const getSkills = () => {
        axiosInstance.get(`Skill`).then((response) => 
        {
            setSkills(response.data.data);

        }).catch(error => {
            if(error.response)
            {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT        
                });
            }
            else if (error.request)
            {
                if (error.response.status === 403 || error.response.status === 401) {
                    toast.error("Unauthorized", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  } else {
                    toast.error("Server Inactive or Busy", {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  }
            }
        });
    }
    const [search, setSearch] = useState('');
    const filteredSkills = 
    {
        list: skills.filter((item) =>item.skillName.toLowerCase().includes(search.toLowerCase())),
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => 
    {
        setSearch(event.target.value);
    };

    React.useEffect( () => {
        getSkills();
    }, []);
    
    return (
        <>
        {loading ? <Loader /> : ""}
        <div className="my-container shadow pb-5" >
            <div className="row mb-3">
                <div className="d-flex px-4 col-md-12">
                    <h5 className='align-middle px-2'>Expertise Levels:</h5>
                    <span className="badge rounded-pill border border-4 basic">Basic</span>
                    <span className="badge rounded-pill border border-4 novice">Novice</span>
                    <span className="badge rounded-pill border border-4 intermediate">Intermediate</span>
                    <span className="badge rounded-pill border border-4 advanced">Advanced</span>
                    <span className="badge rounded-pill border border-4 expert">Expert</span>
                </div>
            </div>
            <div className="row">
                <div className="d-flex col justify-content-center">
                    <h3>List of Skills</h3>
                </div>
            </div>
            <div className="d-flex justify-space-between align-items-center">
                <div className="mx-4 col-md-3">
                <input 
                    list="skill-list" type="text" onChange={handleSearch} placeholder="Search for a Skill"
                    className="form-control" id="item-search-input">
                </input>
                
                <datalist id="skill-list">
                    {skills.map((item) => (
                    <div key={item.id}>
                        <option value={item.skillName}></option>
                    </div>
                    ))}
                </datalist>
                </div>                        
            </div>
            <hr></hr>
            <div className="mt-2">
                <div className="table-responsive card">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">S.No.</th>
                                <th scope="col">Skill</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredSkills.list.map((skill,index) => {
                            return (
                                <tr>
                                    <td className='table-fit'>{index+1}</td>
                                    <td className='table-fit'>{skill.skillName}</td>
                                    <td className='skill-table-cell'>{skill.description}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    );
}
export default AvailableSkills;