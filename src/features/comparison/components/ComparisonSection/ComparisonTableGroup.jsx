import { Stack } from "@mui/material";
import ComparisonTable from "features/comparison/components/ComparisonSection/ComparisonTable";
import { usePhoneComparisonContext } from "features/comparison/context";

const ComparisonTableGroup = () => {
  const {
    state: { displayedData, viewMode },
  } = usePhoneComparisonContext();
  // console.log(displayedData);

  return (
    <Stack display="column" spacing={1}>
      {Object.entries(displayedData).map(([sectionName, tableData], idx) => (
        <ComparisonTable
          sectionName={sectionName}
          tableData={tableData}
          viewMode={viewMode}
          key={idx}
        />
      ))}
    </Stack>
  );
};

export default ComparisonTableGroup;
