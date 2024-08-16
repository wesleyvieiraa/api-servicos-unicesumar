import React, { useState } from "react";
import { Grid, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepOneSchema } from "layouts/NewService/validations/serviceForm";
import MDButton from "components/MDButton";
import { SelectChangeEvent } from "@mui/material";
import { z } from "zod";

type StepOneSchema = z.infer<typeof stepOneSchema>;

export const BasicInformations = ({
  handleNextStep,
}: {
  handleNextStep: (data: any) => void;
}): JSX.Element => {
  const [categories, setCategories] = useState(["Categoria 1", "Categoria 2"]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneSchema>({
    resolver: zodResolver(stepOneSchema),
  });

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedCategory(value);
    // Se "Criar nova categoria" for selecionado, não limpa o campo
    if (value !== "new-category") {
      setNewCategory("");
    }
  };

  const handleNewCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(event.target.value);
  };

  const addNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
    }
  };

  const onSubmit = (data: StepOneSchema) => {
    handleNextStep(data); // Chamar a função para o próximo passo
  };

  return (
    <MDBox p={2}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDInput
              variant="standard"
              label={"Nome do Serviço"}
              fullWidth
              required
              {...register("serviceName")}
              error={!!errors.serviceName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant="standard" fullWidth required>
              <InputLabel>Categoria</InputLabel>
              <Select value={selectedCategory} onChange={handleCategoryChange} label="Categoria">
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
                <MenuItem value="new-category">+ Criar nova categoria</MenuItem>
              </Select>
            </FormControl>

            {selectedCategory === "new-category" && (
              <MDBox mt={2}>
                <TextField
                  variant="standard"
                  label="Nova Categoria"
                  value={newCategory}
                  onChange={handleNewCategoryChange}
                  fullWidth
                />
                <MDButton
                  variant="gradient"
                  color="dark"
                  onClick={addNewCategory}
                  style={{ marginTop: "10px" }}
                >
                  Adicionar Categoria
                </MDButton>
              </MDBox>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <MDInput
              variant="standard"
              label={"Nome do Prestador"}
              fullWidth
              required
              {...register("providerName")}
              error={!!errors.providerName}
            />
          </Grid>
          <Grid item xs={12}>
            <MDInput
              variant="standard"
              type="textarea"
              label={"Descrição"}
              multiline
              rows={5}
              fullWidth
              required
              {...register("description")}
              error={!!errors.description}
            />
          </Grid>
        </Grid>
        <MDBox mt={3} width="100%" display="flex" justifyContent="end">
          <MDButton variant="gradient" color="dark" type="submit">
            Próximo
          </MDButton>
        </MDBox>
      </form>
    </MDBox>
  );
};
