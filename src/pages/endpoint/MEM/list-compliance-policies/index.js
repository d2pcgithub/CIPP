import { Layout as DashboardLayout } from "/src/layouts/index.js";
import { CippTablePage } from "/src/components/CippComponents/CippTablePage.jsx";
import { Book, LaptopChromebook, RocketLaunch } from "@mui/icons-material";
import { GlobeAltIcon, TrashIcon, UserIcon } from "@heroicons/react/24/outline";
import { PermissionButton } from "/src/utils/permissions.js";
import Link from "next/link";

const Page = () => {
  const pageTitle = "Intune Compliance Policies";
  const cardButtonPermissions = ["Endpoint.MEM.ReadWrite"];

  const actions = [
    {
      label: "Create template based on policy",
      type: "POST",
      url: "/api/AddIntuneTemplate",
      data: {
        ID: "id",
        ODataType: "@odata.type",
      },
      confirmText: "Are you sure you want to create a template based on this policy?",
      icon: <Book />,
      color: "info",
    },
    {
      label: "Assign to All Users",
      type: "POST",
      url: "/api/ExecAssignPolicy",
      data: {
        AssignTo: "allLicensedUsers",
        ID: "id",
        type: "deviceCompliancePolicies",
      },
      confirmText: "Are you sure you want to assign this policy to all users?",
      icon: <UserIcon />,
      color: "info",
    },
    {
      label: "Assign to All Devices",
      type: "POST",
      url: "/api/ExecAssignPolicy",
      data: {
        AssignTo: "AllDevices",
        ID: "id",
        type: "deviceCompliancePolicies",
      },
      confirmText: "Are you sure you want to assign this policy to all devices?",
      icon: <LaptopChromebook />,
      color: "info",
    },
    {
      label: "Assign Globally (All Users / All Devices)",
      type: "POST",
      url: "/api/ExecAssignPolicy",
      data: {
        AssignTo: "AllDevicesAndUsers",
        ID: "id",
        type: "deviceCompliancePolicies",
      },
      confirmText: "Are you sure you want to assign this policy to all users and devices?",
      icon: <GlobeAltIcon />,
      color: "info",
    },
    {
      label: "Delete Policy",
      type: "POST",
      url: "/api/RemovePolicy",
      data: {
        ID: "id",
        URLName: "deviceCompliancePolicies",
      },
      confirmText: "Are you sure you want to delete this policy?",
      icon: <TrashIcon />,
      color: "danger",
    },
  ];

  const offCanvas = {
    extendedInfoFields: [
      "createdDateTime",
      "displayName",
      "lastModifiedDateTime",
      "PolicyTypeName",
    ],
    actions: actions,
  };

  const simpleColumns = ["displayName", "description", "lastModifiedDateTime"];

  return (
    <CippTablePage
      title={pageTitle}
      apiUrl="/api/ListGraphRequest"
      apiDataKey="Results"
      apiData={{
        Endpoint: "deviceManagement/deviceCompliancePolicies",
        $orderby: "displayName",
        $count: true,
        $expand: "assignments",
        manualPagination: true,
      }}
      actions={actions}
      offCanvas={offCanvas}
      simpleColumns={simpleColumns}
      cardButton={
        <PermissionButton
          requiredPermissions={cardButtonPermissions}
          component={Link}
          href="/endpoint/MEM/add-policy"
          startIcon={<RocketLaunch />}
        >
          Deploy Policy
        </PermissionButton>
      }
    />
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
