import React from 'react'

const CheckOutPage = () => {
    return (
        <>
            <section id='checkout' className="section">
                <div className='container'>
                    <h1>Check out</h1>
                    <div style={{ display: 'flex',flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <form style={{flexGrow: '1'}}>
                            <div style={{ padding: '10px 0' }}>
                                <label>Email</label>
                                <input
                                    style={{ margin: '10px 0' }}
                                    type="email"
                                    className="input_field"
                                    placeholder="Email Address*"
                                    required
                                // value={subValue}
                                // onChange={(e) => setSubValue(e.target.value)}
                                />
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <div style={{ padding: '10px 0' }}>
                                    <label>Email</label>
                                    <input
                                        style={{ margin: '10px 0' }}
                                        type="email"
                                        className="input_field"
                                        placeholder="Email Address*"
                                        required
                                    // value={subValue}
                                    // onChange={(e) => setSubValue(e.target.value)}
                                    />
                                </div>
                                <div style={{ padding: '10px 0' }}>
                                    <label>Email</label>
                                    <input
                                        style={{ margin: '10px 0' }}
                                        type="email"
                                        className="input_field"
                                        placeholder="Email Address*"
                                        required
                                    // value={subValue}
                                    // onChange={(e) => setSubValue(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{ padding: '10px 0' }}>
                                <label>Email</label>
                                <input
                                    style={{ margin: '10px 0' }}
                                    type="email"
                                    className="input_field"
                                    placeholder="Email Address*"
                                    required
                                // value={subValue}
                                // onChange={(e) => setSubValue(e.target.value)}
                                />
                            </div>
                            <div style={{ padding: '10px 0' }}>
                                <label>Email</label>
                                <input
                                    style={{ margin: '10px 0' }}
                                    type="email"
                                    className="input_field"
                                    placeholder="Email Address*"
                                    required
                                // value={subValue}
                                // onChange={(e) => setSubValue(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn">Subscribe</button>
                        </form>
                        <div style={{flexGrow: '1'}}>
                            abc
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CheckOutPage