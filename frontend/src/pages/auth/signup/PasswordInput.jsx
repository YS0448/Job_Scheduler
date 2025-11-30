import { useState } from "react"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group"
import { Eye, EyeOff } from "lucide-react"

export default function PasswordInput({ id, label, value, onChange }) {
  const [show, setShow] = useState(false)
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={show ? "text" : "password"}
          placeholder="•••••••"          
          value={value}
          onChange={onChange}
          autoComplete="new-password"
        />
        <InputGroupAddon align="inline-end">
          <button type="button" className="p-2" onClick={() => setShow(!show)}>
            {show ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
          </button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
