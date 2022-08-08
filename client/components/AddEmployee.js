import { Button, Form, Input, InputNumber, Select } from 'antd';
import {React, useReducer, useState} from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../helper/fetcher';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Popup from './popup/Popup';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
export default function AddEmployee (props){
  //get department
  const [formRef] = useForm();
  const { data, error } = useSWR('http://localhost:8800/department', fetcher);
  axios.defaults.baseURL = 'http://localhost:8800';
  const onFinish = async (values) => {
 
    const info = await axios.post('/employee', {
       name: values.user.name,
       email: values.user.email,
       phone: values.user.phone,
       job_title: values.user.job,
       department_id:  parseInt(values.user.department),
    }).then(function (response) {
      console.log(response);
      formRef.resetFields();
      props.setAddVisible(false);
      mutate('http://localhost:8800/employee');
      toast("Employee added Successfully", {type: 'success'});
    })
    .catch(function (error) {
      console.log("rrrrr");
      //console.log(info);
      console.log(error);
    });
    return values; // here return object of values of inputs.
  };
 
  return (
    <Form form={formRef} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'phone']}
        label="Phone"
        rules={[{ required: true, message: "Please input employee phone!" },{
         type:"number",
          message: 'Please enter a numbers only',
          transform(value) {
            return Number(value);
            }
      }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'job']}
        label="Job title"
        rules={[
          {
            type: 'string',
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={['user', 'department']}
        label="Department"
        rules={[
          {
            required: true,
          },
        ]}
        
      >
        <Select
          placeholder="Select a option"
          allowClear
        >
          { data ? (data.map( (department) => {
            return <Select.Option value={department.id} key={department.id}>{department.name} </Select.Option>
          } )) 
          : ""
          }
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
      
    </Form>
  );
};

