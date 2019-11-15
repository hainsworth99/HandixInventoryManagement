import React from 'react';

const Assemblies = ({assemblies}) => {
    return (
        <div>
            <center><h1>Assemblies</h1></center>
            {assemblies.map((assembly) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{assembly.AssemblyName}</h5>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Assemblies