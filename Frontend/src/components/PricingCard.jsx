import React from 'react'

const PricingCard = ({plan}) => {
  return (
    <div className='w-full max-w-[300px] h-full text-white rounded-md rounded-xl border border-indigo-700/40 bg-slate-950 p-6'>
     <p className='font-semibold text-lg'>{plan.name}</p>
     <span className='text-3xl font-bold '>{plan.price}</span><span className='text-gray-400 text-sm'>/{plan.credits} credits</span>

     <p className='text-xs text-gray-300 mt-2'>{plan.description}</p>

     <div className='flex flex-col mt-5 gap-2 '>
       {
        plan.features.map((feature , index)=>{
            return <p className="text-gray-300 text-xs" key={index}>
              <span className="text-indigo-500">✓</span><span>{" "}</span>
                 {feature}
            </p>
        })
       }

     
     </div>
      <button className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-2 rounded-md text-sm font-medium hover:opacity-70 transition">
        Buy Now
      </button>

    </div>
  )
}

export default PricingCard