import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, updateItem } from '../context/itemSlice';
import './AddItem.css'

const AddItem = () => {
  const items = useSelector((state) => state.items.items);
  const [itemValue, setItemValue] = useState('');
  const [updateId, setUpdateId] = useState(null);
  const dispatch = useDispatch();
  const handleCreate = () => {
    if (itemValue.trim()) {
      dispatch(addItem({ id: Date.now(), value: itemValue }));
      setItemValue('');
    }
  };
  const handleEdit = (id, value) => {
    setItemValue(value);
    setUpdateId(id);
  };
  const handleUpdate = () => {
    if (updateId && itemValue.trim()) {
      dispatch(updateItem({ id: updateId, newData: { value: itemValue } }));
      setItemValue('');
      setUpdateId(null);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };
  return (
    <>
      <div>
        <div className='wrapper'>
          <h1 className='title'>CRUD Operations</h1>
          <div className='add'>
            <input
              className='add__inp'
              type="text"
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
              placeholder="Enter item"
            />
            {!updateId ? (
              <button className='add__btn' onClick={handleCreate}>Add</button>
            ) : (
              <button className='add__btn' onClick={handleUpdate}>Save</button>
            )}
          </div>
          <ul className='collection'>
            {items.map((item) => (
              <>
              <div className='card__wrapper'>
              <li className='read' key={item.id}>
                {item.value}
              </li>
              <div className='btn'>
                <button className='edit__btn' onClick={() => handleEdit(item.id, item.value)}>Edit</button>
                <button className='del__btn' onClick={() => handleDelete(item.id)}>Delete</button>
              </div>

              </div>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>

  );
};

export default AddItem;
