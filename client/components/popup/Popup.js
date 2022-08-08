import React from 'react'
import AddEmployee from '../AddEmployee';
import UpdateEmployee from '../UpdateEmployee';
import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then( (res) => res.json() )
function Popup(props) {
  // const { data , error } = useSWR("http://localhost:8800/employee", fetcher);
  return (
   ( props.trigger) ? (
    <div className='popup'>
        <div className="popup-inner">
            {props.add ? <AddEmployee setAddVisible={props.setAddVisible} /> : ""}
            {props.edit ? <UpdateEmployee setEditVisible={props.setEditVisible} info = {props.info} />: ""}
            {/* {props.childern} */}
            {/* <button class="bg-gray hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                 Close
            </button> */}
           
        </div>
    </div>
   ) : ""
  )
}

export default Popup