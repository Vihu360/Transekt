import { Modal } from "antd";
import { useConfigureProviders } from "../hooks/context";
import ProviderConfigForm from "./ProviderConfigForm";

export default function ConfigureProviders() {
  const { open, selectedProvider, closeModal, handleProviderAdded, onRefresh } = useConfigureProviders();
  
  const handleSave = (data: Record<string, unknown>) => {
    console.log('Provider configuration saved:', data);
    // Notify parent component about the provider change
    handleProviderAdded(data);
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };
  
  return (
    <Modal
      open={open}
      title={null}
      onCancel={closeModal}
      footer={null}
      width={600}
      centered
      className="provider-config-modal"
    >
      {selectedProvider && (
        <ProviderConfigForm
          provider={selectedProvider}
          onSave={handleSave}
          onCancel={handleCancel}
          onRefresh={onRefresh}
        />
      )}
    </Modal>
  );
}