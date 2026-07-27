import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Radio,
} from "@mui/material";

import Button from "../../../components/Button";

const AddressCard = ({ address, selected, onSelect }) => {
  return (
    <Card
      sx={{
        border: selected ? "2px solid #1976d2" : "1px solid #ddd",
        borderRadius: 2,
        mb: 2,
        boxShadow: 1,
      }}
    >
      <CardContent>
        {/* Address Content */}
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Radio checked={selected} onChange={() => onSelect(address.id)} />

          <Box>
            <Typography variant="h6" fontWeight="bold">
              {address.fullName}
            </Typography>

            <Typography variant="body1">{address.street}</Typography>

            <Typography variant="body1">
              {address.city}, {address.state} {address.zipCode}
            </Typography>

            <Typography variant="body1">India</Typography>

            <Typography variant="body1" mt={1}>
              Name: {address.name}
            </Typography>
            <Typography variant="body1" mt={1}>
              Phone number: {address.phone}
            </Typography>

            <Button
              text="Add delivery instructions"
              variant="text"
              sx={{
                mt: 1,
                p: 0,
                minWidth: "auto",
                width: "fit-content",
              }}
            />
          </Box>
        </Box>

        {/* Bottom Actions */}
        <Stack
          direction="row"
          spacing={2}
          mt={3}
          ml={5}
          sx={{ alignItems: "center" }}
        >
          <Button
            text="Edit"
            variant="text"
            sx={{
              minWidth: "auto",
              width: "fit-content",
              p: 0,
            }}
          />

          <Typography>|</Typography>

          <Button
            text="Remove"
            variant="text"
            sx={{
              minWidth: "auto",
              width: "fit-content",
              p: 0,
              color: "error.main",
            }}
          />

          <Typography>|</Typography>

          <Button
            text="Set as Default"
            variant="text"
            sx={{
              minWidth: "auto",
              width: "fit-content",
              p: 0,
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
