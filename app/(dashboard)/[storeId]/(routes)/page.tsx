import { getTotalRevenue } from '@/actions/get-total-revenues'
import Heading from '@/components/Heading'
import Overview from '@/components/overview'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatter } from '@/lib/utils'
import { CreditCard, IndianRupee, Package } from 'lucide-react'
import React from 'react'

const DashboardPage = async({params}:{params:{storeId:string}}) => {


    const {totalRevenue,salesCount,stockCount,graphData}=await getTotalRevenue(params.storeId);


  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <Heading
        title="Dashboard"
        description='Overview of your store'
        />
        <hr/>
        <div className='grid gap-4 grid-cols-1 '>
          <div className='grid gap-4 md:grid-cols-3 grid-cols-1'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
              Total Revenue
              </CardTitle>
              <IndianRupee className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl  font-bold'>
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Sales
              </CardTitle>
              <CreditCard className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                    +{salesCount}         
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Products In Stock
              </CardTitle>
              <Package className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {stockCount}
              </div>
            </CardContent>
          </Card>
          </div>
          <Card className=''>
            <CardHeader>
              <CardTitle>
               Overview
              </CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <Overview data={graphData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage