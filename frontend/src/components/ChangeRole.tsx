//@ts-nocheck
import React, { useState } from "react";

const modules = ["Customer", "Employee", "Support Staffs", "Accountants"];
const actions = ["view", "add", "update", "delete", "ownData"];

const RolePermissionsForm = ({ role }) => {
  const [rolePermissions, setRolePermissions] = useState(
    role.permissions || []
  );

  const handlePermissionChange = (module, action) => {
    setRolePermissions((prevPermissions) => {
      const modulePermission = prevPermissions.find((p) => p.module === module);

      if (modulePermission) {
        if (modulePermission.actions.includes(action)) {
          // Remove action if it already exists
          modulePermission.actions = modulePermission.actions.filter(
            (a) => a !== action
          );
        } else {
          // Add action if it doesn't exist
          modulePermission.actions.push(action);
        }

        // If no actions left, remove the module entirely
        if (modulePermission.actions.length === 0) {
          return prevPermissions.filter((p) => p.module !== module);
        }
      } else {
        // Add new module with the selected action
        prevPermissions.push({ module, actions: [action] });
      }

      return [...prevPermissions];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save rolePermissions to the backend
    console.log("Updated Role Permissions:", rolePermissions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <thead>
          <tr>
            <th>Module Name</th>
            {actions.map((action) => (
              <th key={action}>{action}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modules.map((moduleName, index) => {
            const modulePermission = rolePermissions.find(
              (p) => p.module === moduleName
            );

            return (
              <tr key={index}>
                <td>{moduleName}</td>
                {actions.map((action) => {
                  const isChecked = modulePermission
                    ? modulePermission.actions.includes(action)
                    : false;

                  return (
                    <td key={action}>
                      <input
                        type="checkbox"
                        defaultChecked={isChecked}
                        onChange={(e) =>
                          handlePermissionChange(moduleName, action)
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RolePermissionsForm;
