import React, { useEffect } from "react"

import { Checkbox, Form, Input, Modal, Radio, Select, Collapse } from "antd"
import type { Home } from "../types/Home"
import { mapHomeToRaw, mapRawToHome } from "../utils/home"

const { TextArea } = Input
const { Panel } = Collapse

type Props = {
    open: boolean
    onClose: () => void
    onSave: (home: Home) => void
    selectedHome: Home | null
}

const AddHomeForm: React.FC<Props> = ({ open, onClose, onSave, selectedHome }) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if (selectedHome && open) {
            const data = mapHomeToRaw(selectedHome)
            form.setFieldsValue(data)
        } else {
            form.setFieldsValue({
                status: "2",
                app: "1",
                advertiser: "1",
                isGroundFloor: "3",
                hasElevator: "1",
                hasAC: "1",
                hasGarage: "2",
                energyEfficiency: "1",
                kitchen: ["1", "2", "3", "4", "5"],
            })
        }
    }, [selectedHome, open, form])

    return (
        <Modal
            open={open}
            onCancel={() => {
                onClose()
                form.resetFields()
            }}
            okText='Save'
            onOk={async () => {
                try {
                    const values = await form.validateFields()
                    values.key = selectedHome?.key
                    onSave(mapRawToHome(values))
                    form.resetFields()
                    onClose()
                } catch (error) {
                    console.log("Validation failed:", error)
                }
            }}
            okButtonProps={{ style: { color: "black" } }}
            style={{ top: 20 }}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 15 }}
                layout='horizontal'
                style={{ maxWidth: 600, paddingTop: 30 }}
            >
                <Collapse style={{ marginBottom: 20 }} defaultActiveKey={["1"]}>
                    <Panel header={<strong>Datos del anuncio</strong>} key='1'>
                        <Form.Item label='Estado' name='status'>
                            <Select placeholder='Seleccionar'>
                                <Select.Option value='1'>Guardado</Select.Option>
                                <Select.Option value='2'>Contactado</Select.Option>
                                <Select.Option value='3'>Visita concertada</Select.Option>
                                <Select.Option value='4'>Visitado</Select.Option>
                                <Select.Option value='5'>Rechazado</Select.Option>
                                <Select.Option value='6'>Despublicado</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label='App' name='app'>
                            <Radio.Group>
                                <Radio value='1'>Idealista</Radio>
                                <Radio value='2'>Fotocasa</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label='Alquiler'
                            name='rent'
                            rules={[{ required: true, message: "Introduce el precio del alquiler" }]}
                        >
                            <Input type='number' min={1} placeholder='€' />
                        </Form.Item>
                        <Form.Item
                            label='Barrio'
                            name='neighborhood'
                            rules={[{ required: true, message: "Introduce el barrio" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Calle'
                            name='street'
                            rules={[{ required: true, message: "Introduce la calle" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Número de habitaciones'
                            name='numRooms'
                            rules={[{ required: true, message: "Introduce el número de habitaciones" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Metros²'
                            name='squareMeters'
                            rules={[{ required: true, message: "Introduce el número de metros²" }]}
                        >
                            <Input type='number' min={1} />
                        </Form.Item>
                        <Form.Item label='Anunciante' name='advertiser'>
                            <Radio.Group>
                                <Radio value='1'>Inmobiliaria</Radio>
                                <Radio value='2'>Particular</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='Condiciones' name='conditions'>
                            <TextArea rows={2} />
                        </Form.Item>
                        <Form.Item label='Distancia a transportes' name='distanceToTransport'>
                            <TextArea rows={1} />
                        </Form.Item>
                        <Form.Item label='Es un bajo' name='isGroundFloor'>
                            <Radio.Group>
                                <Radio value='1'>Sí</Radio>
                                <Radio value='2'>No</Radio>
                                <Radio value='3'>No sé</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div className='flex justify-between items-start gap-5'>
                            <Form.Item label='Ascensor' name='hasElevator'>
                                <Radio.Group>
                                    <Radio value='1'>Sí</Radio>
                                    <Radio value='2'>No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label='Aire acondicionado' name='hasAC' style={{ width: "70%" }}>
                                <Radio.Group>
                                    <Radio value='1'>Sí</Radio>
                                    <Radio value='2'>No</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div className='flex justify-between items-start gap-5'>
                            <Form.Item label='Garaje' name='hasGarage'>
                                <Radio.Group>
                                    <Radio value='1'>Sí</Radio>
                                    <Radio value='2'>No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label='Eficiencia Energética' name='energyEfficiency' style={{ width: "70%" }}>
                                <Select placeholder='Seleccionar'>
                                    <Select.Option value='1'>N/A</Select.Option>
                                    <Select.Option value='2'>A</Select.Option>
                                    <Select.Option value='3'>B</Select.Option>
                                    <Select.Option value='4'>C</Select.Option>
                                    <Select.Option value='5'>D</Select.Option>
                                    <Select.Option value='6'>E</Select.Option>
                                    <Select.Option value='7'>F</Select.Option>
                                    <Select.Option value='8'>G</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item
                            label='Cocina'
                            name='kitchen'
                            rules={[{ required: true, message: "Selecciona las prestaciones de la cocina" }]}
                        >
                            <Select placeholder='Seleccionar' mode='multiple'>
                                <Select.Option value='1'>Frigo</Select.Option>
                                <Select.Option value='2'>Congelador</Select.Option>
                                <Select.Option value='3'>Microondas</Select.Option>
                                <Select.Option value='4'>Vitro</Select.Option>
                                <Select.Option value='5'>Lavadora</Select.Option>
                                <Select.Option value='6'>Campana</Select.Option>
                                <Select.Option value='7'>Horno</Select.Option>
                                <Select.Option value='8'>Lavavajillas</Select.Option>
                            </Select>
                        </Form.Item>
                    </Panel>
                    <Panel header={<strong>A tener en cuenta en la visita</strong>} key='2'>
                        <Form.Item name='nearbySupermarkets' valuePropName='checked'>
                            <Checkbox>Supermercados cerca</Checkbox>
                        </Form.Item>
                        <Form.Item name='hasGoodLighting' valuePropName='checked'>
                            <Checkbox>Piso luminoso</Checkbox>
                        </Form.Item>
                        <Form.Item name='individualHeating' valuePropName='checked'>
                            <Checkbox>Calefacción individual</Checkbox>
                        </Form.Item>
                        <Form.Item name='hasVentilationGrilles' valuePropName='checked'>
                            <Checkbox>Rejillas de ventilación</Checkbox>
                        </Form.Item>

                        <strong>Revisar correcto funcionamiento de: </strong>
                        <hr />

                        <Form.Item name='faucetsCondition' valuePropName='checked'>
                            <Checkbox>Grifos</Checkbox>
                        </Form.Item>
                        <Form.Item name='outletsCondition' valuePropName='checked'>
                            <Checkbox>Enchufes</Checkbox>
                        </Form.Item>
                        <Form.Item name='doorHandlesCondition' valuePropName='checked'>
                            <Checkbox>Pomos de las puertas</Checkbox>
                        </Form.Item>
                        <Form.Item name='windowsCondition' valuePropName='checked'>
                            <Checkbox>Ventanas</Checkbox>
                        </Form.Item>
                        <Form.Item name='showerCondition' valuePropName='checked'>
                            <Checkbox>Ducha</Checkbox>
                        </Form.Item>
                        <Form.Item name='hasCeilingHumidity' valuePropName='checked'>
                            <Checkbox>Humedad en el techo</Checkbox>
                        </Form.Item>
                        <Form.Item name='canTurnOnLights' valuePropName='checked'>
                            <Checkbox>Luces</Checkbox>
                        </Form.Item>
                    </Panel>
                </Collapse>
                <Form.Item label='Notas' name='notes' style={{ fontWeight: "bold" }}>
                    <TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddHomeForm
