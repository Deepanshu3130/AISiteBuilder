import React from 'react'
import PricingCard from '../components/PricingCard'
export const appPlans = [
        {
            id: 'basic',
            name: 'Basic',
            price: '$5',
            credits: 100,
            description: 'Start Now, scale up as you grow.',
            features: ['Upto 20 Creations', 'Limited Revisions', 'Basic AI Models', 'email support', 'Basic analytics',],
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$19',
            credits: 400,
            description: 'Add credits to create more projects',
            features: ['Upto 80 Creations', 'Extended Revisions', 'Advanced AI Models', 'priority email support', 'Advanced analytics',],
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            price: '$49',
            credits: 1000,
            description: 'Add credits to create more projects',
            features: ['Upto 200 Creations', 'Increased Revisions', 'Advanced AI Models', 'email + chat support', 'Advanced analytics',],
        }
    ]
const Pricing = () => {
  return (
    <div className='flex flex-col max-w-[90%] mx-auto mt-10'>
       <div className='max-w-[30%] mx-auto text-white flex flex-col gap-3'>
         <p className='text-center text-4xl font-semibold tracking-wide text-gray-300'>Choose Your Plan</p>
         <p className='text-center text-gray-300 tracking-wide'> Start for free and scale up as you grow .Find perfect plan for your content creation needs</p>
       </div>

       <div className='flex justify-center mt-14 gap-8 items-center flex-wrap '>
        {
          appPlans.map((plan, index)=>{
            return <PricingCard plan = {plan} key={index}/>
          })
        }
       </div>
      <p className='text-center text-slate-500 max-w-[30%] mx-auto mt-10'> Project Creation/Revision consume 5 credits .You can purchase more credits to create more projects</p>


    </div>
  )
}

export default Pricing