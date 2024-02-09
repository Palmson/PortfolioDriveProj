import { Environment, Sphere } from "@react-three/drei"
import { Gradient, LayerMaterial } from "lamina"
import * as THREE from 'three'

export const Background = () => {
    return (
        <>
        <Environment preset="night" />
        <Sphere scale ={[100, 100, 100]} rotation-y={Math.PI / 2}>
            <LayerMaterial
                lighting="physical"
                transmission={1}
                side={THREE.BackSide}
            >
                <Gradient colorB={'#282A3A'} colorA={'#000000'} axes={"y"} start={0.5} end={-0.5}/>
            </LayerMaterial>
        </Sphere>
        </>
    )
}