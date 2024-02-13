import * as React from 'react';
import { Icon } from '@fluentui/react';
import { useState, useEffect } from 'react';

export interface IProgressStatusBarComponentProps {
  statusesSchema?: string;
  optionSelectedValue?: number;
}

interface OptionSet {
  name: string;
  value: number;
}

const ProgressStatusBarComponent: React.FC<IProgressStatusBarComponentProps> = (props) => {

  const [statusArray, setStatusArray] = useState<OptionSet[]>(JSON.parse(props.statusesSchema!));
  const [activeBarLength, setActiveBarLength] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect (() => {
    statusArray.map((item, index) => {
      if(item.value == props.optionSelectedValue){
        console.log(index, statusArray.length)
        setActiveIndex(index)
        setActiveBarLength((index/(statusArray.length-1))*100 + "%")
      }
    })
  }, [statusArray, props.optionSelectedValue])
  useEffect(() => {
    console.log(statusArray);
  }, [statusArray])

  return (
    <div className="stepper-wrapper">
      { statusArray.length > 0 && 
        statusArray.map((item, index) => {
          return (
            <div key={index} className={"stepper-item" + (item.value == props.optionSelectedValue ? " active" : "") + (index < activeIndex  ? " completed" : "")}>
              <div className="step-counter">{index+1}</div>
              <div className="step-name">{item.name}</div>
            </div>
          );
        })
      }
    </div>
  )
}

export default ProgressStatusBarComponent