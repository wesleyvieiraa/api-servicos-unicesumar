import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import team5 from "assets/images/team-5.jpg";

function Header(): JSX.Element {
  const avatarStyles: { [key: string]: any } = {
    border: ({ borders: { borderWidth }, palette: { white } }: Theme) =>
      `${borderWidth[2]} solid ${white.main}`,
    cursor: "pointer",
    position: "relative",
    ml: -1.5,

    "&:hover, &:focus": {
      zIndex: "10",
    },
  };

  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mt={0.5} pr={1}>
        <MDBox mb={1} ml={-1.25} lineHeight={0}>
          <MDTypography variant="caption" color="secondary">
            Team members:
          </MDTypography>
        </MDBox>
        <MDBox display="flex">
          <MDAvatar src={team1} alt="team-1" size="sm" sx={avatarStyles} />
          <MDAvatar src={team2} alt="team-1" size="sm" sx={avatarStyles} />
          <MDAvatar src={team3} alt="team-1" size="sm" sx={avatarStyles} />
          <MDAvatar src={team4} alt="team-1" size="sm" sx={avatarStyles} />
          <MDAvatar src={team5} alt="team-1" size="sm" sx={avatarStyles} />
        </MDBox>
      </MDBox>
      <MDBox height="75%" alignSelf="flex-end">
        <Divider orientation="vertical" />
      </MDBox>
      <MDBox pl={1}>
        <MDButton variant="gradient" color="info" iconOnly>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default Header;