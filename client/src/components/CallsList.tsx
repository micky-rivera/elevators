import {useEffect} from 'react';

function CallsList({callsList, setCallsList}: CallsListProps) {

  return (
    <>
        <div className="calls">
            {callsList.map((call: Call, index: number)=> (
                <p key={index} >{call.origin} =&gt; {call.destination}</p>
                ))}
        </div>
    </>
  );
}

export default CallsList;
