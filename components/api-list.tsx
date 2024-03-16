import React from 'react'
import Heading from './Heading'
import ApiAlert from './api-alert'
import useOrigin from '@/hooks/use-origin'
import { useParams } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'

const ApiList = ({
    entityName,
    entityId
}:{
    entityName:string,
    entityId:string  
}) => {

    const origin=useOrigin();
    const params=useParams();
    const isMediumScreen=useMediaQuery({minWidth:768});
    const isSmallScreen=useMediaQuery({minWidth:550});

  return (
    <div className={` api-sm:max-w-[350px]  sm:max-w-full max-w-[330px]`}>
    {/* // <div className='sm:max-w-full'> */}
        <Heading
        title={"Api List"}
        description={`APi call for ${entityName}`}
        />
        <div>
          <ApiAlert variant='public'
          title='GET'
          description={`${origin}/api/${params.storeId}/${entityName}`}
          />
          <ApiAlert variant='public'
          title='GET'
          description={`${origin}/api/${params.storeId}/${entityName}/{${entityId}}`}
          />
          <ApiAlert variant='admin'
          title='POST'
          description={`${origin}/api/${params.storeId}/${entityName}`}
          />
          <ApiAlert variant='admin'
          title='PATCH'
          description={`${origin}/api/${params.storeId}/${entityName}/{${entityId}}`}
          />
          <ApiAlert variant='admin'
          title='DELETE'
          description={`${origin}/api/${params.storeId}/${entityName}/{${entityId}}`}
          />
        </div>
    </div>
  )
}

export default ApiList