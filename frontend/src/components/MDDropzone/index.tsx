import { useEffect, useRef } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import MDBox from "components/MDBox";
import MDDropzoneRoot from "components/MDDropzone/MDDropzoneRoot";
import { useMaterialUIController } from "context";

// Declaring props types for MDDropzone
interface Props {
  options: {
    [key: string | number]: any;
  };
}

function MDDropzone({ options }: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const dropzoneRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz: any) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <MDDropzoneRoot
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <MDBox className="fallback" bgColor="transparent">
        <input name="file" type="file" multiple />
      </MDBox>
    </MDDropzoneRoot>
  );
}

export default MDDropzone;
