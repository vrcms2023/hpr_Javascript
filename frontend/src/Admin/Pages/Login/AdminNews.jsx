import React, { useState, useEffect } from 'react'
import CatageoryImgC from '../../../Common/CatageoryImgC';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../Components/FileUpload';
import Button from '../../../Common/Button';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import { getBaseURL } from '../../../util/ulrUtil';
import { confirmAlert } from 'react-confirm-alert';
import DeleteDialog from '../../../Common/DeleteDialog';
import Title from '../../../Common/Title'

export const AdminNews = () => {
    const navigate = useNavigate();
    const [newsObject, setNewsObject] = useState([]);
    const [newProject, setNewProject] = useState({ _id: uuidv4() })
    const newsKeys = { newstitle: '', description: '' }
    const [newsState, setnewsState] = useState(newsKeys)
    const [cookies] = useCookies(["token", "userName"]);
    const [errorMessage, setErrorMessage] = useState("")
    const [editState, setEditState] = useState(false);
    const [id, setID] = useState('')

    const changeHandler = (e) => {
        setnewsState({ ...newsState, [e.target.name]: e.target.value });
    }

    const [newsList, setNewsList] = useState([]);
    const backendURL = getBaseURL();

    const getNewList = () => {
        fetch(`${backendURL}/api/appnews/getNewsList`, {
            headers: {
                "authorization": `Bearer ${cookies.userToken}`,
                "Content-type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.appNews?.length > 0) {
                    setNewsList(data.appNews);
                } else {
                    setNewsList([]);
                }
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        getNewList()
    }, [cookies]);

    const saveProject = async () => {

        const news = {
            projectID: newProject._id,
            newstitle: newsState.newstitle,
            description: newsState.description,
            imageId: newsObject[0]?._id,
            originalname: newsObject[0]?.originalname,
            imageUrl: newsObject[0]?.path,
            updateBy: cookies.userName,
            _id: id
        }
        const newsURL = editState ? `${backendURL}/api/appnews/updateNews` : `${backendURL}/api/appnews/addNews`

        try {
            const res = await fetch(newsURL, {
                method: "POST",
                headers: {
                    "authorization": `Bearer ${cookies.userToken}`,
                    "Content-type": "application/json",
                },
                body: JSON.stringify(news)
            })
            const data = await res.json()
            if (data?.appNews) {
                setEditState(false)
                setnewsState(newsKeys)
                setNewsObject([])
                getNewList();
            } else {
                setErrorMessage('Unable to save the news')
            }
        } catch (err) {
            setErrorMessage(err)
        }
    }

    const handleNewsEdit = (event, news) => {
        event.preventDefault();
        const { imageId, projectID, originalname, imageUrl, description, newstitle, _id } = news

        const newsObj = {
            newstitle: newstitle,
            description: description
        }
        setNewProject({ _id: projectID })
        setnewsState(newsObj)
        setEditState(true)
        setID(_id)
        window.scrollTo(0, 0)

    }

    const handleNewsDelete = (event, news) => {
        event.preventDefault();
        const deleteSelectedNews = () => {
            fetch(`${backendURL}/api/appnews/deleteSelectedNews/${news._id}`, {
                headers: {
                    "authorization": `Bearer ${cookies.userToken}`,
                    "Content-type": "application/json",
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.appNews?.acknowledged) {
                        setEditState(false)
                        setnewsState(newsKeys)
                        setNewsObject([])
                        getNewList();
                    }
                }).catch(err => console.log(err))
        }
        confirmAlert({
            customUI: ({ onClose, }) => {
                return (
                    <DeleteDialog onClose={onClose} callback={deleteSelectedNews} projectName={news.newstitle} />
                );
            }
        });
    }

    return (
        <div className='bg-light pt-5' style={{ marginTop: "90px" }}>
            <div className='row bg-light px-5'>
                <div className='text-end d-flex justify-content-between'>
                    <Title title={'News And Update'} cssClass="text-center fs-3" />
                    <Button type="submit" cssClass="btn btn-secondary" label="Back to Menu" handlerChange={() => navigate("/main")} />
                </div>
            </div>

            <div className='row bg-light px-5 mt-3 pt-5 shadow-lg'>
                <div className="tab-content" id="v-pills-tabContent">
                    <div className="tab-pane fade show active" id="v-pills-news" role="tabpanel" aria-labelledby="v-pills-news-tab">
                        <div className="border border-3 p-5 mb-4 shadow-lg">
                        {errorMessage && <Error>{errorMessage}</Error>}
                            <div className="mb-3">
                                <label htmlFor="projectDescription" className="form-label  ">News Title</label>
                                <input type='text' className="form-control" name="newstitle" value={newsState.newstitle} onChange={changeHandler} id="newstitle" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="projectDescription" className="form-label  ">News Description</label>
                                <textarea className="form-control" name="description" value={newsState.description} onChange={changeHandler} id="projectDescription" rows="3"></textarea>
                            </div>
                            <div className='mb-3'>
                                <FileUpload title="News Images" project={newProject} updatedBy={cookies.userName} category="news" gallerysetState={setNewsObject} galleryState={newsObject} validTypes="image/png,image/jpeg" />
                                <CatageoryImgC title={`News Image`} catategoryImgs={newsObject} catategoryImgState={setNewsObject} project={newProject} category="news" cssClass="thumb75 mb-5 shadow-lg border border-5 border-warning rounded-5" />
                            </div>
                            <div className='text-center'>
                                <Button type="submit" cssClass="btn  btn-success" label={editState ? "Update News" : "Save News"} handlerChange={saveProject} />
                            </div>
                            {newsList.length > 0 ? (
                                <div className="row bg-light px-5 py-4">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>News Title</th>
                                                <th>Description</th>
                                                <th >Image</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {newsList?.map(news => (
                                                <tr key={news._id}>
                                                    <td>{news.newstitle}</td>
                                                    <td>{news.description}</td>
                                                    <td> {news?.imageUrl ? (<img width={'100'} height={'100'} src={`${news.imageUrl}`} alt=" " />) : ''} </td>
                                                    <td>
                                                        <Link onClick={() => handleNewsEdit(event, news)}><i className="fa fa-pencil fs-4 text-secondary me-2" aria-hidden="true"></i></Link>
                                                        <Link onClick={() => handleNewsDelete(event, news)}><i className="fa fa-trash-o fs-4 text-danger" aria-hidden="true"></i></Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : ('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminNews;
