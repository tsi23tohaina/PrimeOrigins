package m_tech.backEnd.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
public class JWTService {
    @Autowired
    private JwtEncoder jwtEncoder;
    public JWTService(JwtEncoder jwtEncoder){
        this.jwtEncoder = jwtEncoder;
    }
    public String generateJwt(Authentication authentication){
        String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        JwsHeader header = JwsHeader
                .with(MacAlgorithm.HS256)
                .type("JWT")
                .build();
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plus(1, ChronoUnit.DAYS))
                .subject(authentication.getName())
                .claim("role",roles)
                .build();
        JwtEncoderParameters jwtEncoderParameters = JwtEncoderParameters.from(header, claims);
        return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
    }
}
