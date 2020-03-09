import React from 'react'

const Rank = ({name, enteries, firstTag, secondTag, thirdTag}) => {
    console.log(!firstTag == null)
    if (firstTag == null) {
        return (
            <div>
                <div className='white f3 mt2'>
                {`${name} , yours total recognition count is ${enteries}`}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='white f3 mt2'>
                {`${name} , yours total recognitions count is ${enteries}`}
                </div>
                <div className='white f5 mt2'>
                {`Guess here ${firstTag}, ${secondTag} and ${thirdTag}`}
                </div>
            </div>
        )
    }
}

export default Rank