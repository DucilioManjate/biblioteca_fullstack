import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { useState, useCallback } from "react";
import { api } from "../../services/api";

type EditHotelFormData = {
  name: string;
};

const EditHotelFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  logradouro: yup.string().required("Logradouro obrigatório"),
  numero: yup.number().required("Número obrigatório"),
  cidade: yup.string().required("Cidade obrigatório"),
  status: yup.string().required("Estado obrigatório"),
});

export default function EditHotel() {
  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [status, setEstado] = useState("");
  
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(EditHotelFormSchema),
  });

  const { errors } = formState;

  // const createAutorFormSchema  = useCallback(async (data) => {
  //   try {
  //     await api.post("livros", data);
  //   } catch (error) {
  //     console.log(error.error);
  //   }
  // }, []);

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" mx="auto" maxWidth={1480} px="6">
        <SideBar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
          onSubmit={EditHotel}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Editar cliente
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="nome"
                label="Nome do Hotel"
                error={errors.nome}
                {...register("nome")}
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
              <Input name="classificacao" label="Classificação" type="number" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input 
                name="logradouro"
                label="Rua"
                error={errors.logradouro}
                {...register("logradouro")}
                value={logradouro}
                onChange={(event) => setLogradouro(event.target.value)}
                />
              <Input 
                name="numero"
                type="number" 
                label="Número" 
                error={errors.numero}
                {...register("numero")}
                value={numero}
                onChange={(event) => setNumero(Number(event.target.value))}
                />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input 
                name="complemento"
                label="Complemento"
                error={errors.complemento}
                {...register("complemento")}
                value={complemento}
                onChange={(event) => setComplemento(event.target.value)}
                />
              <Input 
                name="cidade" 
                label="Cidade" 
                error={errors.cidade}
                {...register("cidade")}
                value={cidade}
                onChange={(event) => setCidade(event.target.value)}                
                />
              <Input 
                name="status" 
                label="Estado" 
                error={errors.status}
                {...register("status")}
                value={status}
                onChange={(event) => setEstado(event.target.value)}
                />
            </SimpleGrid> 
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/livros">
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={formState.isSubmitting}
              >
                Editar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
