import { Button, Form, Input, InputNumber } from 'antd';
import {React, useReducer} from 'react';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';

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
const formReducer = (state, event) => {
  console.log("formReducer");
  return {
    ...state,
    [event.target.name]: event.target.value
  }
}
export default function FormEmployee (){

  return(
    <AddEmployee />
  )
  // const onFinish = (values) => {
  //   console.log("onfinish");
  //   console.log(values);
  //   return values; // here return object of values of inputs.
   
  // };
  //  console.log("fooooooorm");
  //  const [formData , setFormData] = useReducer(formReducer, {});
  //  const handleSubmit = () => {
  //   console.log("handlesubmit");
  //    console.log(formData);
  //  }
  // return (
  //   <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
  //     <Form.Item
  //       name={['user', 'name']}
  //       label="Name"
  //       rules={[
  //         {
  //           required: true,
  //         },
  //       ]}
  //       onChange={setFormData}
  //     >
  //       <Input />
  //     </Form.Item>
  //     <Form.Item
  //       name={['user', 'email']}
  //       label="Email"
  //       rules={[
  //         {
  //           type: 'email',
  //           required: true,
  //         },
  //       ]}
  //       onChange={setFormData}
  //     >
  //       <Input />
  //     </Form.Item>
  //     <Form.Item
  //       name={['user', 'phone']}
  //       label="Phone"
  //       rules={[
  //         {
  //           type: 'string',
  //           required: true,
  //         },
  //       ]}
  //       onChange={setFormData}
  //     >
  //       <Input />
  //     </Form.Item>
  //     <Form.Item
  //       name={['user', 'job']}
  //       label="Job title"
  //       rules={[
  //         {
  //           type: 'string',
  //           required: true,
  //         },
  //       ]}
  //       onChange={setFormData}
  //     >
  //       <Input />
  //     </Form.Item>
  //      <Form.Item
  //       name="gender"
  //       label="Department"
  //       rules={[
  //         {
  //           required: true,
  //         },
  //       ]}
  //     >
  //       <Select
  //         placeholder="Select a option and change input text above"
  //         onChange={}
  //         allowClear
  //       >
  //         <Option value="male">male</Option>
  //         <Option value="female">female</Option>
  //         <Option value="other">other</Option>
  //       </Select>
  //     </Form.Item> 
    
  //     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
  //       <Button type="primary" htmlType="submit">
  //         Submit
  //       </Button>
  //     </Form.Item>
  //   </Form>
  // );
};

// export default form;