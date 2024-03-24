// 
import React, { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from "firebase/database";
import "./homepage.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';

function Homepage() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                onValue(ref(db, `${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map(todo => {
                            setTodos(oldArray => [...oldArray, todo]);
                        });
                    }
                })
            } else if (!user) {
                navigate('/');
            }
        })
    }, [navigate]);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => { navigate("/"); })
            .catch((err) => alert(err.message));
    };

    const writetodb = () => {
        const uidd = uid();
        set(ref(db, `${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        });
        setTodo("");
    };

    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    };

    const handleEdit = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            uidd: tempUidd
        });
        setIsEdit(false);
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    return (
        <div className="homepage">
            <div className="input-container">
                <input className="add-edit-input" placeholder="Add Todo" type='text' value={todo} onChange={(e) => setTodo(e.target.value)} />
                {isEdit ? (
                    <CheckIcon className="add-icon" onClick={handleEdit}/>
                ) : (
                    <AddIcon className="add-icon" onClick={writetodb}/>
                )}
            </div>

            {todos.map((todo) => (
                <div className="todo" key={todo.uidd}>
                    <h1>{todo.todo}</h1>
                    <EditIcon onClick={() => handleUpdate(todo)}/>
                    <DeleteIcon onClick={() => handleDelete(todo.uidd)}/>
                </div>
            ))}

            <LogoutIcon className="logout" onClick={handleSignOut}/>
        </div>
    );
}

export default Homepage;
