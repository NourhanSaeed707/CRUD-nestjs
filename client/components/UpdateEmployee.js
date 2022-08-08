import { Button, Form, Input, InputNumber, Select } from 'antd';
import {React, useEffect} from 'react';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../helper/fetcher';
// import { Option } from 'antd/lib/mentions';

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
/* eslint-enable no-template-curly-in-string */

export default function UpdateEmployee (props){
  axios.defaults.baseURL = 'http://localhost:8800';
  //to fill form with employee values.
  const fillForm =  () => {
    console.log("id");
    console.log(props.info.department_.id);
    formRef.setFieldsValue({
      ...props,
      name: props.info.name,
      email:props.info.email,
      phone:props.info.phone,
      job: props.info.job_title,
      department: String(props.info.department_.id)
    });
  };
  useEffect( () => {
   fillForm();
  }, [props.info.id]);
  
  const [formRef] = useForm();
  const { data, error } = useSWR('http://localhost:8800/department', fetcher);
  const onFinish = async (values) => {
    // console.log("user info name: " + values.name);
    // console.log("user info phone: " + values.phone);
   // console.log("user info dep: " + values.department);
   console.log("vaalues");
    console.log(  values);
    console.log(values.department);
    const infor = await axios.patch(`/employee/${props.info.id}`, {
       name: values.name,
       email: values.email,
       phone: values.phone,
       job_title: values.job,
       department_:  parseInt(values.department),
    }).then(function (response) {
      //console.log(response);
      formRef.resetFields();
      props.setEditVisible(false);
      toast("Employee edit Successfully", {type: 'success'});
      mutate('http://localhost:8800/employee');
    })
    .catch(function (error) {
      console.log("rrrrr");
      props.setEditVisible(false);
      console.log(error);
    });
    return values; // here return object of values of inputs.
  };  
  return (
    <Form form={formRef} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name="name"
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
        name="email"
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
        name="phone"
        label="Phone"
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
        name="job"
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
        name="department"
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
            console.log("depppp: " + department.id);
            return <Select.Option value={String(department.id)} key={department.id}>{department.name} </Select.Option>
          } )) 
          : ""
          }

        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" >
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

