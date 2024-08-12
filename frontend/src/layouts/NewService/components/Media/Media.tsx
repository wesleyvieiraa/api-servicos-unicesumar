import MDBox from "components/MDBox";
import MDDropzone from "components/MDDropzone";
import MDTypography from "components/MDTypography";
import { useMemo } from "react";

export const Media = (): JSX.Element => {
  return (
    <MDBox>
      <MDBox mt={3}>
        <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <MDTypography component="label" variant="button" fontWeight="regular" color="text">
            Imagens do Serviço
          </MDTypography>
        </MDBox>
        {useMemo(
          () => (
            <MDDropzone options={{ addRemoveLinks: true }} />
          ),
          []
        )}
      </MDBox>
    </MDBox>
  );
};
