import update  from 'immutability-helper';
import { useCallback, useState } from "react";
import { ListItem } from "./components/ListItem";

const LIST = ['A', 'B', 'C', 'E', 'F'];


export const SingleList = ()=> {
    const [list, setList] = useState(LIST);

    const handleDrop = (fromIndex, toIndex)=> {
        if(fromIndex === toIndex){
            return;
        }    
        console.log(fromIndex, toIndex);
        const newList = [...list];

        if(fromIndex < toIndex){
            const firstHalf = newList.slice(0, fromIndex);
            const middleHalf = newList.slice(fromIndex, toIndex);
            middleHalf.shift();
            middleHalf.push(list[fromIndex]);
            const lastHalf = newList.slice(toIndex);
            
            setList([...firstHalf, ...middleHalf, ...lastHalf]);
        }else{
            const firstHalf = newList.slice(0, toIndex);
            const middleHalf = newList.slice(toIndex, fromIndex);
            // middleHalf.shift();
            // middleHalf.pop()
            middleHalf.unshift(list[fromIndex]);
            const lastHalf = newList.slice(fromIndex);
            lastHalf.shift()
            console.log(firstHalf, middleHalf,lastHalf)
            setList([...firstHalf, ...middleHalf, ...lastHalf]);
        }
        


        // const fromIndexItem = list[fromIndex];
        // const newList = [...list.slice(0, toIndex), fromIndexItem, ...list.slice(toIndex)];
        // newList.splice(fromIndex, 1);
        // setList(newList);


    
        
    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setList((prevList: string[]) =>
          update(prevList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevList[dragIndex] ],
            ],
          }),
        )
      }, [])
 
      const renderCard = useCallback(
        (title: string , index: number) => {
          return (
            <ListItem
              key={title}
              index={index}
              title={title}
              moveCard={moveCard}
              onDrop={()=> {}}
            />
          )
        },
        [],
      )

    return <div className="single-list">
        {
            // list.map((l, index)=> <ListItem  index={index} key={l} title={l} onDrop={handleDrop} moveCard={moveCard}/>)
            list.map((l, index)=> renderCard(l, index))
        }
    </div>
    
}