import { DashboardHeader } from "../../../components/panelheader"
import { Container } from "../../../components/container"
import { FiUpload } from "react-icons/fi"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório."),
    model: z.string().nonempty("O modelo é obrigatório"),
    year: z.string().nonempty("O ano do carro é obrigatório"),
    km: z.string().nonempty("O KM do carro é obrigatório"),
    price: z.string().nonempty("O preço é obrigatório"),
    city: z.string().nonempty("A cidade é obrigatório"),
    whatsapp: z.string().min(1,  "O telefone é obrigatório").refine((value) => /^(\d{10,11})$/.test(value), {
        message: "Número de telefone inválido."
    }),
    description: z.string().nonempty("A descrição é obrigatório"),
})

type FormData = z.infer<typeof schema>

export function New(){
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
                        type="file"  accept="image/*"/>
                    </div>
                </button>

            </div>


            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                

            </div>

        </Container>
    )
}