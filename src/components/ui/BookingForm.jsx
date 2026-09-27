import { useState } from 'react';
import { useTravelStore } from '../../store/useTravelStore';

export function BookingForm() {
    const { booking, updateBooking } = useTravelStore();
    const [sent, setSent] = useState(false);

    const inputClass =
        'form-input-hover w-full border-b border-black/20 bg-transparent py-4 text-sm ' +
        'outline-none placeholder:text-black/40 focus:border-gold transition-all duration-300';

    function submit(e) {
        e.preventDefault();
        setSent(true);
    }

    if (sent)
        return (
            <div className="py-12 text-center">
                <p className="eyebrow">Received</p>
                <h3 className="serif mt-4 text-4xl">Your next chapter begins here.</h3>
                <p className="mx-auto mt-4 max-w-sm text-sm text-black/55">
                    Our travel designers will be in touch within one working day.
                </p>
            </div>
        );

    return (
        <form onSubmit={submit} className="grid gap-x-12 md:grid-cols-2">
            <input
                required
                className={inputClass}
                placeholder="Your name"
                value={booking.name || ''}
                onChange={(e) => updateBooking({ name: e.target.value })}
            />
            <input
                required
                type="email"
                className={inputClass}
                placeholder="Email address"
                value={booking.email || ''}
                onChange={(e) => updateBooking({ email: e.target.value })}
            />
            <select
                className={inputClass}
                value={booking.style || ''}
                onChange={(e) => updateBooking({ style: e.target.value })}
            >
                <option value="">Trip style</option>
                <option>Culture &amp; heritage</option>
                <option>Wild landscapes</option>
                <option>Slow coastal living</option>
            </select>
            <input
                className={inputClass}
                placeholder="When would you like to leave?"
                value={booking.date || ''}
                onChange={(e) => updateBooking({ date: e.target.value })}
            />
            <textarea
                className={`${inputClass} md:col-span-2`}
                rows="3"
                placeholder="Tell us what you are dreaming of"
                value={booking.note || ''}
                onChange={(e) => updateBooking({ note: e.target.value })}
            />
            <button className="gold-button mt-7 w-fit" type="submit">
                Begin a conversation
            </button>
        </form>
    );
}
