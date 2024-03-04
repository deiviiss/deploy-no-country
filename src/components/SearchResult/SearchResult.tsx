import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styles from './SearchResult.module.css'
import { useQueryParamsContext } from '@/app/context'
import { useEffect } from 'react'
import { useState } from 'react'
import { any } from 'zod'

export function SearchResult ( ): JSX.Element {
  const router = useRouter()
  const [propertiesArray, setPropertiesArray] = useState([]) as any

  const { queryParams } = useQueryParamsContext()
  

    useEffect(() => {
       const fetching = async () => {
         const results =  await fetch(`http://localhost:3000/api/search-properties?query=${queryParams.query}&bathrooms=${queryParams.bathrooms}&bedrooms=${queryParams.bedrooms}`)
         const data = await results.json()
         
         console.log(data);
         setPropertiesArray(data)
         console.log(propertiesArray);
         
         
       }

       fetching()

    },[queryParams])

  return (
        <div>
            <h3 className={styles.title}>Search Results</h3>
            <div className={styles.cardContainer}>
            {propertiesArray.map((item, index) => (
                <Card key={index} style={{ width: '18rem' }} className={styles.card} onClick={() => { router.push(`/product/${item.id}`) }}>
                    <Card.Img variant="top" src={item.img} className={styles.img} />
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            <p>Precio: ${item.price}</p>
                            <p>Habitaciones: {item.bedrooms}</p>
                            <p>Baños: {item.bathrooms}</p>
                        </Card.Text>
                        <Button variant="primary">Contactanos</Button>
                    </Card.Body>
                </Card>
            ))}
            </div>
        </div>
  )
}
