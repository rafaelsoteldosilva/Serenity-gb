import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import {
    initialXPos,
    initialYPos,
    initialFov,
} from "../globals/globalConstants";

export default function Model() {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("./studio_w_c.glb");
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions.Kill_action.play();
    });
    useThree(({ camera }) => {
        camera.position.set(initialXPos, initialYPos, 6.7);
        camera.rotation.set(0.1, -0.8, 0.08);
        camera.fov = initialFov;
        camera.updateProjectionMatrix();
    });
    return (
        <group ref={group} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.pasted__Hips} />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_Body.geometry}
                    material={nodes.pasted__MocapGuy_Body.material}
                    skeleton={nodes.pasted__MocapGuy_Body.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_BrowsLashes.geometry}
                    material={nodes.pasted__MocapGuy_BrowsLashes.material}
                    skeleton={nodes.pasted__MocapGuy_BrowsLashes.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_Caruncula.geometry}
                    material={nodes.pasted__MocapGuy_Caruncula.material}
                    skeleton={nodes.pasted__MocapGuy_Caruncula.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_Eyes.geometry}
                    material={materials.pasted__Eye_MAT1}
                    skeleton={nodes.pasted__MocapGuy_Eyes.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_EyesSpec.geometry}
                    material={materials.pasted__Eye_Spec_MAT1}
                    skeleton={nodes.pasted__MocapGuy_EyesSpec.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_Hat.geometry}
                    material={nodes.pasted__MocapGuy_Hat.material}
                    skeleton={nodes.pasted__MocapGuy_Hat.skeleton}
                />
                <skinnedMesh
                    geometry={nodes.pasted__MocapGuy_Teeth.geometry}
                    material={nodes.pasted__MocapGuy_Teeth.material}
                    skeleton={nodes.pasted__MocapGuy_Teeth.skeleton}
                />
            </group>
            <mesh
                geometry={nodes.Line61001.geometry}
                material={nodes.Line61001.material}
            />
            <mesh
                geometry={nodes.Line61001_1.geometry}
                material={materials.Metal}
            />
            <mesh
                geometry={nodes.Line61001_2.geometry}
                material={materials.desk3}
            />
            <mesh
                geometry={nodes.Line61001_3.geometry}
                material={materials.desk2}
            />
            <mesh
                geometry={nodes.Line61001_4.geometry}
                material={materials.standardSurface2}
            />
            <mesh
                geometry={nodes.Line61001_5.geometry}
                material={materials.suelo}
            />
            <mesh
                geometry={nodes.Line61001_6.geometry}
                material={materials.Chair_1}
            />
            <mesh
                geometry={nodes.Line61001_7.geometry}
                material={materials.Ch33_body}
            />
            <mesh
                geometry={nodes.Line61001_8.geometry}
                material={materials.Chair_2}
            />
            <mesh
                geometry={nodes.Line61001_9.geometry}
                material={materials.Ch31_body}
            />
            <mesh
                geometry={nodes.Line61001_10.geometry}
                material={materials["pasted__ai_keys.001"]}
            />
            <mesh
                geometry={nodes.Line61001_11.geometry}
                material={materials.Studio_light_mat_5_}
            />
            <mesh
                geometry={nodes.Line61001_12.geometry}
                material={materials["Material.002"]}
            />
            <mesh
                geometry={nodes.Line61001_13.geometry}
                material={materials.ai_emission}
            />
            <mesh
                geometry={nodes.Line61001_14.geometry}
                material={materials["aiStandardSurface9.001"]}
            />
            <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                <mesh
                    geometry={nodes.Mesh007.geometry}
                    material={materials.MONITOR_1}
                />
                <mesh
                    geometry={nodes.Mesh007_1.geometry}
                    material={nodes.Mesh007_1.material}
                />
                <mesh
                    geometry={nodes.Mesh007_2.geometry}
                    material={materials.MONITOR_2}
                />
            </group>
        </group>
    );
}

useGLTF.preload("/studio_w_c.glb");
