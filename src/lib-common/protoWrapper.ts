/**
 * This class wraps proto buffers and adds a layer of logic to each message type. Proto buffers should not be directly
 * used in code. By using wrappers we can swap message definitions and avoid large refactors.
 */
abstract class ProtoWrapper <Proto> {
    // Returns the underlying proto for the wrapper.
    public abstract get proto(): Proto;
}

export { ProtoWrapper };
