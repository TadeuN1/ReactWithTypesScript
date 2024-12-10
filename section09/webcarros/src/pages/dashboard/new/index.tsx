import { DashboardHeader } from "../../../components/panelheader"
import { Container } from "../../../components/container"
import { FiUpload } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChangeEvent, useState, useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import {v4 as uuidV4} from 'uuid'
import { storage } from "../../../services/firebaseConnection"
import { ref, getDownloadURL, deleteObject,uploadBytes } from "firebase/storage"




const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório."),
    model: z.string().nonempty("O modelo é obrigatório"),
    year: z.string().nonempty("O ano do carro é obrigatório"),
    km: z.string().nonempty("O KM do carro é obrigatório"),
    price: z.string().nonempty("O preço é obrigatório"),
    city: z.string().nonempty("A cidade é obrigatório"),
    whatsapp: z.string().min(1,  "O telefone é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
        message: "Número de telefone inválido."
    }),
    description: z.string().nonempty("A descrição é obrigatório"),
})

type FormData = z.infer<typeof schema>

export function New(){
    const { user } = useContext(AuthContext)

    const { register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    async function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === 'image/jpeg' || image.type === "image/png"){
              await handleUpload(image)
            } else {
                alert("Envie uma imagem jpeg ou png!")
                return
            }
        }
    }

    async function handleUpload(image: File) {
        if(!user?.uid){
            return
        }

        const currentUid = user?.uid
        const uidImage = uuidV4()

        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

        uploadBytes(uploadRef, image)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadUrl) => {
                console.log("URL DE ACESSO", downloadUrl)
            })
        })
    }

    function onSubmit(data:FormData){
        console.log(data)
    }

    return(
        <Container>
            <DashboardHeader/>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000" />
                    </div>
                    <div className="cursor-pointer ">
                        <input 
                        className="opacity-0 cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        />
                    </div>
                </button>

            </div>


            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <p className="mb-2 font-medium">Nome do carro</p>
                        <Input
                        type="text"
                        register={register}
                        name="name"
                        error={errors.name?.message}
                        placeholder="Ex.: Onix 1.0"                        
                        />
                        
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Modelo do carro</p>
                        <Input
                        type="text"
                        register={register}
                        name="model"
                        error={errors.model?.message}
                        placeholder="Ex.:1.0 FLEX MANUAL"                        
                        />
                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                    <div className="w-full">
                        <p className="mb-2 font-medium">Ano do veículo</p>
                        <Input
                        type="text"
                        register={register}
                        name="year"
                        error={errors.year?.message}
                        placeholder="Ex.: 2016/2016"                        
                        />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 font-medium">Quilometragem do veículo</p>
                        <Input
                        type="text"
                        register={register}
                        name="km"
                        error={errors.km?.message}
                        placeholder="Ex.: 23.900"                        
                        />
                    </div>
                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                    <div className="w-full">
                        <p className="mb-2 font-medium">Telefone para contato.</p>
                        <Input
                        type="text"
                        register={register}
                        name="whatsapp"
                        error={errors.whatsapp?.message}
                        placeholder="Ex.: 85 9 9999-9898"                        
                        />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 font-medium">Cidade</p>
                        <Input
                        type="text"
                        register={register}
                        name="city"
                        error={errors.city?.message}
                        placeholder="Ex.: São Paulo - SP"                        
                        />
                    </div>
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Preço sugerido</p>
                        <Input
                        type="text"
                        register={register}
                        name="price"
                        error={errors.price?.message}
                        placeholder="Ex.: R$ 32.000"                        
                        />
                        
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium"> Descrição </p>

                        <textarea
                        className="border-2 w-full rounded-md h-24 px-2"
                        {...register("description")}
                        name="description"
                        id="description"
                        placeholder="Digite a descrição do veículo."
                        />
                        {errors.description && <p className="mb-1 text-red-500"> {errors.description.message}</p>   }

                        

                    </div>

                    <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"> Cadastrar</button>

                </form>

            </div>

        </Container>
    )
}