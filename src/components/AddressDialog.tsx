import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  Home,
  MapPin,
  Pencil,
  Plus,
  Users,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useToast } from '../context/ToastContext'
import type { Address } from '../types'
import { Modal } from './Modal'

interface AddressDialogProps {
  open: boolean
  onClose: () => void
}

type View = 'list' | 'form'

function AddressIcon({ label }: { label: string }) {
  if (label.toLowerCase() === 'work') return <BriefcaseBusiness size={18} />
  if (label.toLowerCase() === 'family') return <Users size={18} />
  return <Home size={18} />
}

const labelOptions = ['Home', 'Work', 'Family', 'Other']

export function AddressDialog({ open, onClose }: AddressDialogProps) {
  const {
    addresses,
    selectedAddress,
    selectAddress,
    addAddress,
    updateAddress,
  } = useApp()
  const { showToast } = useToast()
  const [view, setView] = useState<View>('list')
  const [editing, setEditing] = useState<Address | null>(null)
  const [label, setLabel] = useState('Home')
  const [line1, setLine1] = useState('')
  const [area, setArea] = useState('')
  const [instructions, setInstructions] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setView('list')
    setEditing(null)
    setError('')
  }, [open])

  const startAdd = () => {
    setEditing(null)
    setLabel('Home')
    setLine1('')
    setArea('')
    setInstructions('')
    setError('')
    setView('form')
  }

  const startEdit = (address: Address) => {
    setEditing(address)
    setLabel(address.label)
    setLine1(address.line1)
    setArea(address.area)
    setInstructions(address.instructions ?? '')
    setError('')
    setView('form')
  }

  const handleSave = (event: FormEvent) => {
    event.preventDefault()
    if (!line1.trim() || !area.trim()) {
      setError('Add a street address and area to save this address.')
      return
    }

    if (editing) {
      updateAddress({
        ...editing,
        label: label.trim() || 'Saved',
        line1: line1.trim(),
        area: area.trim(),
        city: 'Dhaka',
        instructions: instructions.trim() || undefined,
      })
      selectAddress(editing.id)
      showToast('Delivery address updated')
    } else {
      addAddress({
        label: label.trim() || 'Saved',
        line1: line1.trim(),
        area: area.trim(),
        city: 'Dhaka',
        instructions: instructions.trim() || undefined,
      })
      showToast('New delivery address saved')
    }
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={view === 'list' ? 'Delivery address' : editing ? 'Edit address' : 'Add an address'}
      description={
        view === 'list'
          ? 'Choose where you would like your order delivered.'
          : 'Use fictional details for this prototype.'
      }
    >
      {view === 'list' ? (
        <div className="address-list">
          {addresses.map((address) => {
            const isSelected = address.id === selectedAddress.id
            return (
              <div
                className={`address-row ${isSelected ? 'is-selected' : ''}`}
                key={address.id}
              >
                <button
                  type="button"
                  className="address-row__select"
                  onClick={() => {
                    selectAddress(address.id)
                    showToast(`Delivering to ${address.label}`)
                    onClose()
                  }}
                >
                  <span className="address-row__icon" aria-hidden="true">
                    <AddressIcon label={address.label} />
                  </span>
                  <span className="address-row__copy">
                    <span className="address-row__label">
                      {address.label}
                      {isSelected ? (
                        <span className="selected-pill">
                          <Check size={12} aria-hidden="true" />
                          Selected
                        </span>
                      ) : null}
                    </span>
                    <span className="address-row__line">{address.line1}</span>
                    <span className="address-row__line address-row__line--muted">
                      {address.area}, {address.city}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  className="icon-button address-row__edit"
                  onClick={() => startEdit(address)}
                  aria-label={`Edit ${address.label} address`}
                >
                  <Pencil size={16} aria-hidden="true" />
                </button>
              </div>
            )
          })}
          <button type="button" className="add-address-button" onClick={startAdd}>
            <span className="add-address-button__icon">
              <Plus size={18} aria-hidden="true" />
            </span>
            <span>
              <strong>Add a new address</strong>
              <small>Save another delivery spot</small>
            </span>
          </button>
        </div>
      ) : (
        <form id="address-form" className="form-stack" onSubmit={handleSave}>
          <button
            type="button"
            className="text-back-button"
            onClick={() => {
              setView('list')
              setError('')
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to saved addresses
          </button>

          <div className="field">
            <span className="field__label">Save as</span>
            <div className="chip-row chip-row--compact">
              {labelOptions.map((option) => (
                <button
                  type="button"
                  className={`choice-chip ${label === option ? 'is-active' : ''}`}
                  key={option}
                  onClick={() => setLabel(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span className="field__label">Street address</span>
            <input
              className="text-input"
              value={line1}
              onChange={(event) => setLine1(event.target.value)}
              placeholder="House, road, block"
              data-autofocus
              autoComplete="off"
            />
          </label>

          <label className="field">
            <span className="field__label">Area</span>
            <input
              className="text-input"
              value={area}
              onChange={(event) => setArea(event.target.value)}
              placeholder="e.g. Gulshan 1"
              autoComplete="off"
            />
          </label>

          <label className="field">
            <span className="field__label">
              Delivery note <span className="field__optional">Optional</span>
            </span>
            <input
              className="text-input"
              value={instructions}
              onChange={(event) => setInstructions(event.target.value)}
              placeholder="Landmark or floor number"
              autoComplete="off"
            />
          </label>

          <p className="form-hint">
            <MapPin size={14} aria-hidden="true" />
            City is set to Dhaka for this prototype.
          </p>

          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="form-actions">
            <button
              type="button"
              className="button button--secondary"
              onClick={() => setView('list')}
            >
              Cancel
            </button>
            <button type="submit" className="button button--primary">
              {editing ? 'Save changes' : 'Save & use address'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  )
}
